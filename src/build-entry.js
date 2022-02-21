/**Модуль работы с файловой системой*/
let fs = require('fs')
let path = require('path')
/**Эта херня нужна только для корректной подстановки в шаблон*/
let render = require('json-templater/string')
var endOfLine = require('os').EOL;
// /**
//  * Путь генерации выходного файла
//  * */
let OUTPUT_PATH = path.join(__dirname, '../src/index.js')

let IMPORT_TEMPLATE = `import {{name}} from '{{path}}'`
let OUTPUT_TEMPLATE = `
{{importList}}

const components = [
    {{exportComponentsList}}
]

const install = function(Vue){
    components.forEach((node) => {
        Vue.component(node.name, node)
    })
}

export default {
    install
}

export  {
    {{exportComponentsList}}
}
`

let importList = []
let exportComponentsList = []
let ignoreList = [
    'notpublish',
    'mixins'
]


function findComponents(dir) {
    fs.readdir(dir, (err, files) => {
        console.log(dir.replace(__dirname, '..'))
        console.log(files)
        //Читайем каждый файл в директории
        files.forEach(value => {
            console.log(value)
            let path1 = path.join(dir, value);
            //Читаем свойства файла
            fs.stat(path1, (err1, stats) => {
                if (stats.isDirectory() && !ignoreList.includes(value)) {
                    console.log('is dir')
                    findComponents(path1)
                }
                if (stats.isFile()) {
                    if(!value.endsWith('.vue')) return
                    let name = value.replace('.vue', '');
                    let path2 = dir.replace(__dirname, '.').replace(/\\/g, '/').concat('/' + name);
                    let importLabel = render(IMPORT_TEMPLATE,
                        {
                            name: name,
                            path: path2
                        }
                    );
                    exportComponentsList.push(value.replace('.vue', ''))
                    importList.push(importLabel)
                    console.log(
                        importLabel
                    )
                }
            })
        })
    })
}

console.log(__dirname)
findComponents(path.join(__dirname, './components'))

setTimeout(() => {
    let templateOutput = render(
        OUTPUT_TEMPLATE,
        {
            importList: importList.join(endOfLine),
            exportComponentsList: exportComponentsList.join(',' + endOfLine)
        }
    )

    fs.writeFileSync(OUTPUT_PATH, templateOutput)
    console.log('build-entry finish')
}, 5000)