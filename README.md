# jakesphotos
A simple photography portfolio page written in vanilla React.

## Page Templates

Pages are defined in `content/` as `index.md` files with YAML frontmatter. The `template` frontmatter key selects which template renders the page. All templates support a `title` key.

### `carousel`
Full-height image slideshow that auto-advances and loops infinitely. Shows 3 slides at a time. Pauses on hover; prev/next buttons and dot indicators are provided. Slides are defined as `##` sections — link the heading to make the slide clickable.

```markdown
---
template: carousel
title: Home
---

## [Landscapes](/collection/landscapes)
![](https://...)

## Nature
![](https://...)
```

### `collection`
Masonry photo grid with a lightbox viewer. Images are loaded from a sibling `images.json` array of URLs. Order is randomised on each page load.

```markdown
---
template: collection
title: Landscapes
---
```

`images.json` (same directory):
```json
["https://...", "https://..."]
```

### `menu`
Grid of cards, each linking to another page. Useful for a collections index. Each `##` section becomes a card; link the heading for navigation and include an optional image and description.

```markdown
---
template: menu
title: Collections
description: Browse my photo collections
---

## [Landscapes](/collection/landscapes)
![](https://...)
Mountains, coastal cliffs, and open skies.
```

### `default`
Simple prose page. Renders markdown body content with an optional profile image.

```markdown
---
template: default
title: About Me
profileImage: https://...
---

Markdown content here.
```

### `contact`
Contact page. Renders optional `email` and `instagram` frontmatter as links, followed by any markdown body content.

```markdown
---
template: contact
title: Contact
email: you@example.com
instagram: yourhandle
---

Optional extra markdown here.
```

### `homepage`
Alternating image/text sections. Each `##` section becomes a row with the image on one side and text on the other, alternating left/right.

```markdown
---
template: homepage
title: Welcome
subtitle: Optional subtitle
---

## Section Heading
![](https://...)
Paragraph text here.
```

## Notes on Generating Image Links
Getting image links from Immich is not straightforward.  

Procedure is to
1. Add a new image to the shared folder.
2. Generate a new share link for the folder.
3. Open the shared link, and for each picture right click > open image in new tab.
4. The generated URL should be of the form `https://images.whitney.rip/share/Tr5UMHSuNxQ7C5YgyE10L3J6FaKltllrUjdLttGDnId_MTBF4riEcROs7NqXmC6HJYQ/photos/e03f66a6-a619-4624-a473-860026b3446a/thumbnail?size=preview&key=G4sdLdVrDhEpIFRcIJ9alvI6Re6_CmJGQ1VirR5Y3zjkA22Cr6vMVcviTYpTjq8PnuA&c=S6DnBWy90pmryXsnoQX9CQ3Y%2BBo%3D`
5. URL can be added to the images.js file.

## Running

### Local development
```
npm start
```

### Docker
```
docker compose down && docker system prune -af && docker compose build && docker compose up -d && docker logs -f jakesphotos
```
