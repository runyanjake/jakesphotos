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

## Notes on Generating Image Links
Getting image links from Immich is not straightforward.  

Procedure is to
1. Add a new image to the shared folder.
2. Generate a new share link for the folder.
3. Open the shared link, and for each picture right click > open image in new tab.
4. The generated URL should be of the form `https://images.whitney.rip/api/assets/e03f66a6-a619-4624-a473-860026b3446a/thumbnail?size=preview&key=G4sdLdVrDhEpIFRcIJ9alvI6Re6_CmJGQ1VirR5Y3zjkA22Cr6vMVcviTYpTjq8PnuA&c=S6DnBWy90pmryXsnoQX9CQ3Y%2BBo%3D`
5. URL can be added to the images.js file.