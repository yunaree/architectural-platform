export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formidable: {
        // Збільшуємо максимальний розмір файлу (на всяк випадок)
        maxFileSize: 200 * 1024 * 1024, // 200mb

        // Зберігаємо тимчасові файли прямо в папку проєкту, а не в системний Temp.
        // Це часто допомагає уникнути блокування антивірусом.
        uploadDir: './public/uploads/tmp',
        keepExtensions: true,
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
