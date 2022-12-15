import { compileFile } from "pug";
/**
 *
 * @param {String} relativeTemplatePath Pug template name
 * @param {Object} [data] Object
 * @returns {String} HTML
 */
export function compile(relativeTemplatePath, data) {
  let absoluteTemplatePath =
    process.cwd() + "/src/views/" + relativeTemplatePath + ".pug";
  let compiledTemplate = compileFile(absoluteTemplatePath)(data);
  return compiledTemplate;
}
