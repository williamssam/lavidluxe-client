import fs from 'fs'
import path from 'path'

export const fetchFile = async (filePath: string, fileName: string) => {
  //Find the absolute path of the directory
  const directory = path.join(process.cwd(), filePath)
  const file = fs.readFileSync(`${directory}/${fileName}`, 'utf8')

  return file
}
