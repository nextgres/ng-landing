# NEXTGRES Landing Pages

This project contains the landing pages for NEXTGRES.

## Tech Stack

- [11ty (Eleventy)](https://www.11ty.dev/) static site generator
- [Bootstrap](https://getbootstrap.com/) for styling

## Adding New Pages

1. Create a new `.njk` (Nunjucks) template in the `src/` directory (e.g., `src/new-page.njk`).
2. Add your content and specify the layout at the top of the file:

   ```nunjucks
   ---
   title: My New Page
   layout: base.njk
   ---
   {% block content %}
   <!-- Your content here -->
   {% endblock %}
   ```

3. The page will be built to the `_site/` directory after running the build process.

## Deployment

- All changes pushed to the `main` branch are automatically deployed via GitHub → Netlify integration.
- No manual deployment steps are required.

---
For more details, see the [11ty documentation](https://www.11ty.dev/docs/) and [Bootstrap documentation](https://getbootstrap.com/docs/).
