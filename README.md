# jakesphotos
A simple photography portfolio page written in vanilla React.

## First Time Setup
1. Create basic react app.
```
npx create-react-app portfolio
```
2. Install missing packages
```
npm install web-vitals
npm install react-router-dom
npm install masonry-layout
npm install react-helmet
```
3. Test changes/fixes with
```
npm install
npm start
```

## Running

### Local development
```
npm start
```

### Docker
```
docker compose down && docker system prune -af && docker compose build && docker compose up -d && docker logs -f jakesphotos
```

