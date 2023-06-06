import handlebars from 'handlebars'

export const generateMailTemplate = <T>(file: string, replacements: T) => {
  const template = handlebars.compile(file)
  return template(replacements)
}
