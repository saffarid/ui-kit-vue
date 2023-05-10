/**Модуль работы с файловой системой*/
let fs = require('fs')
let path = require('path')
/**Эта херня нужна только для корректной подстановки в шаблон*/
let render = require('json-templater/string')
var endOfLine = require('os').EOL
// /**
//  * Путь генерации выходного файла
//  * */
const OUTPUT_PATH_INDEX = path.join(__dirname, '../src/index.js')
const OUTPUT_PATH_DECLARATION = path.join(__dirname, '../index.d.ts')


let IMPORT_TEMPLATE = `import {{name}} from '{{path}}'`
let OUTPUT_TEMPLATE = `
// Auto generated file
import {button_types} from './components/controls/input/button/button_types'
import utils          from './js/utils'
{{importList}}

export  {
\tbutton_types,
\tutils,
\t{{exportComponentsList}}
}
`
const DECLARATION_TEMPLATE = `
// Auto generated component declarations
declare module 'saffarid-ui-kit' {
\t{{importListDeclaration}}

\texport {
\t\t{{exportComponentsList}}
\t} 
}
`

const importList = []
const importListDeclaration = []
const exportComponentsList = []
const ignoreList = [
    'notpublish',
    'mixins',
]


function findComponents(dir) {
    fs.readdir(dir, (err, files) => {
        console.log(dir.replace(__dirname, '..'))
        console.log(files)
        //Читайем каждый файл в директории
        files.forEach(value => {
            console.log(value)
            const path1 = path.join(dir, value)
            //Читаем свойства файла
            fs.stat(path1, (err1, stats) => {
                if (stats.isDirectory() && !ignoreList.includes(value)) {
                    console.log('is dir')
                    findComponents(path1)
                }
                if (stats.isFile()) {
                    if (!value.endsWith('.vue')) return
                    const name = value.replace('.vue', '')
                    const path2 = dir.replace(__dirname, '.').replace(/\\/g, '/').concat('/' + name)
                    const path2src = dir.replace(__dirname, './src').replace(/\\/g, '/').concat('/' + name)
                    const importLabel = render(IMPORT_TEMPLATE,
                       {
                           name: name,
                           path: path2,
                       },
                    )
                    const importLabelSrc = render(IMPORT_TEMPLATE,
                       {
                           name: name,
                           path: path2src,
                       },
                    )

                    exportComponentsList.push(value.replace('.vue', ''))
                    importList.push(importLabel)
                    importListDeclaration.push(importLabelSrc)

                    console.log(
                       importLabel,
                    )
                }
            })
        })
    })
}

console.log(__dirname)
findComponents(path.join(__dirname, ''))

setTimeout(() => {
    let templateOutput = render(
       OUTPUT_TEMPLATE,
       {
           importList: importList.join(endOfLine),
           exportComponentsList: exportComponentsList.join(',' + endOfLine + '\t'),
       },
    )
    fs.writeFileSync(OUTPUT_PATH_INDEX, templateOutput)

    templateOutput = render(
       DECLARATION_TEMPLATE,
       {
           importListDeclaration: importListDeclaration.join(endOfLine + '\t'),
           exportComponentsList: exportComponentsList.join(',' + endOfLine + '\t\t'),
       },
    )
    fs.writeFileSync(OUTPUT_PATH_DECLARATION, templateOutput)

    console.log('build-entry finish')
}, 5000)