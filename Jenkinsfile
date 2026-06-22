pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK = credentials('discord-pws-builds-channel-webhook')

        COMPOSE_SERVICE = 'portfolio'
        CONTAINER_NAME  = 'jakesphotos'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
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
                    set -eu
                    : "${DISCORD_WEBHOOK:?required credential discord-pws-builds-channel-webhook is missing}"
                    for f in Dockerfile package.json docker-compose.yml content/_config.json; do
                        [ -f "$f" ] || { echo "ERROR: required file '$f' not found at repo root" >&2; exit 1; }
                    done
                    docker compose config -q
                '''
            }
        }

        stage('Lint & Type-check') {
            steps {
                // Static checks run inside the image's ci target; nothing touches the agent.
                sh 'docker build --target ci -t ${CONTAINER_NAME}-ci:${BUILD_NUMBER} .'
            }
        }

        stage('Teardown') {
            steps {
                sh '''
                    set -eu
                    docker compose down --remove-orphans || true
                    # container_name is fixed, so a stale container can survive "down"
                    # and then block "up" with a name conflict; reap it explicitly.
                    docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
                '''
            }
        }

        stage('Build & Deploy') {
            steps {
                // No build-time secrets: the React build consumes only static content/.
                sh 'docker compose up -d --build'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    set -eu
                    cid="$(docker compose ps -q "$COMPOSE_SERVICE")"
                    [ -n "$cid" ] || { echo "ERROR: $COMPOSE_SERVICE container not found" >&2; exit 1; }

                    # Wait for the image's HEALTHCHECK to report healthy, failing fast on terminal states.
                    deadline=$(( $(date +%s) + 90 ))
                    while :; do
                        status="$(docker inspect -f '{{.State.Status}}' "$cid")"
                        health="$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$cid")"
                        [ "$status" = "running" ] && [ "$health" = "healthy" ] && break
                        [ "$health" = "unhealthy" ] && { echo "ERROR: $COMPOSE_SERVICE reported unhealthy" >&2; exit 1; }
                        case "$status" in
                            exited|dead) echo "ERROR: $COMPOSE_SERVICE container $status before becoming healthy" >&2; exit 1 ;;
                        esac
                        [ "$(date +%s)" -ge "$deadline" ] && { echo "ERROR: timed out waiting for healthy (status=$status, health=$health)" >&2; exit 1; }
                        sleep 2
                    done
                    echo "$COMPOSE_SERVICE healthy"
                '''
            }
        }

        stage('Smoke Test') {
            steps {
                sh '''
                    set -eu
                    cid="$(docker compose ps -q "$COMPOSE_SERVICE")"
                    [ -n "$cid" ] || { echo "ERROR: $COMPOSE_SERVICE container not found" >&2; exit 1; }

                    # Real request from inside the container: GET / must serve the SPA shell.
                    body="$(docker exec "$cid" wget -q -O - http://127.0.0.1:80/)" || { echo "ERROR: GET / did not return a successful response" >&2; exit 1; }
                    echo "$body" | grep -q 'id="root"' || { echo "ERROR: GET / response missing expected app markup" >&2; exit 1; }
                    echo "smoke test passed"
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
