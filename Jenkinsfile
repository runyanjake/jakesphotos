pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = credentials('discord-pws-builds-channel-webhook')

        COMPOSE_PROJECT = 'jakesphotos'
        TRAEFIK_NETWORK = 'traefik'
        APP_HOST        = 'jakesphotos.whitney.rip'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Preflight') {
            steps {
                sh '''
                    set -e
                    if [ -z "$DISCORD_WEBHOOK" ]; then
                        echo "ERROR: required secret DISCORD_WEBHOOK is missing"; exit 1
                    fi
                    docker network inspect "$TRAEFIK_NETWORK" >/dev/null 2>&1 || {
                        echo "ERROR: external network '$TRAEFIK_NETWORK' does not exist"; exit 1
                    }
                    docker compose config -q || {
                        echo "ERROR: docker-compose.yml is malformed"; exit 1
                    }
                '''
            }
        }

        stage('Lint & Type-check') {
            steps {
                // Run checks in a clean, throwaway container so nothing leaks from the agent.
                sh '''
                    set -e
                    docker run --rm -v "$PWD":/app -w /app node:20-alpine sh -c '
                        set -e
                        npm ci
                        node scripts/build-content.js
                        npx eslint src --max-warnings=0
                    ' || { echo "ERROR: static quality checks failed"; exit 1; }
                '''
            }
        }

        stage('Teardown') {
            steps {
                sh '''
                    set -e
                    docker compose down --remove-orphans || {
                        echo "ERROR: failed to tear down previous deployment"; exit 1
                    }
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                // The React build consumes only static content/, so there are no build-time secrets to inject.
                sh '''
                    set -e
                    docker compose build || { echo "ERROR: build failed"; exit 1; }
                    docker compose up -d || { echo "ERROR: deploy failed"; exit 1; }
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    set -e
                    echo "Waiting for $COMPOSE_PROJECT to report live..."
                    for i in $(seq 1 30); do
                        running=$(docker inspect -f '{{.State.Running}}' "$COMPOSE_PROJECT" 2>/dev/null || echo false)
                        if [ "$running" != "true" ]; then
                            echo "ERROR: container $COMPOSE_PROJECT is not running"
                            docker logs --tail 50 "$COMPOSE_PROJECT" || true
                            exit 1
                        fi
                        if docker exec "$COMPOSE_PROJECT" wget -q -O /dev/null http://localhost:80/; then
                            echo "$COMPOSE_PROJECT is live."; exit 0
                        fi
                        sleep 2
                    done
                    echo "ERROR: $COMPOSE_PROJECT did not become healthy in time"; exit 1
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    set -e
                    echo "Smoke testing https://$APP_HOST/ ..."
                    body=$(curl -fsS --retry 5 --retry-delay 3 "https://$APP_HOST/") || {
                        echo "ERROR: request to https://$APP_HOST/ failed"; exit 1
                    }
                    echo "$body" | grep -q 'id="root"' || {
                        echo "ERROR: response did not contain expected app markup"; exit 1
                    }
                    echo "Smoke test passed."
                '''
            }
        }
    }

    post {
        always {
            script {
                def result = currentBuild.currentResult
                def emoji = result == 'SUCCESS' ? ':green_circle:' :
                            result == 'FAILURE' ? ':red_circle:' : ':yellow_circle:'

                def branch = env.BRANCH_NAME ?: env.GIT_BRANCH ?: 'Main/Manual'

                def duration = currentBuild.durationString
                    .replace(' and no weeks', '')
                    .replace(' and counting', '')

                def commits = currentBuild.changeSets.collectMany { set ->
                    set.items.collect { "> ${it.msg} (by *${it.author.fullName}*)" }
                }
                def commitText = commits ? commits.join('\n') : 'No recent changes detected.'

                def discordDescription = """**Status:** ${emoji} ${result}
**Branch:** `${branch}`
**Duration:** :stopwatch: ${duration}

**Commits:**
${commitText}"""

                discordSend(
                    webhookURL: env.DISCORD_WEBHOOK,
                    title: "📦 Build Alert: ${env.JOB_NAME} [Build #${env.BUILD_NUMBER}]",
                    link: "${env.BUILD_URL}",
                    result: "${currentBuild.currentResult}",
                    description: discordDescription
                )
            }
        }

        failure {
            sh '''
                echo "=== docker compose ps ==="
                docker compose ps || true
                echo "=== recent logs ==="
                docker compose logs --tail=200 || true
            '''
        }
    }
}
