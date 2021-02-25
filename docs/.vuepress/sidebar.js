//侧边栏
const fs = require('fs')
const path = require('path')

function getChildren(path, sort = true) {
    let root = []
    readDirSync(path, root)
    root = root.map(item => {
            if (item.split('/')[4]) {
                return item.split('/')[3] + '/' + item.split('/')[4]
            } else {
                return item.split('/')[3]
            }

        })
        //排序
    if (sort) {
        let sortList = []
        let nosortList = []
        root.forEach(item => {
            if (Number(item.replace(".md", "").match(/[^-]*$/))) {
                sortList.push(item)
            } else {
                nosortList.push(item)
            }
        })
        root = sortList.sort(function(a, b) {
            return a.replace(".md", "").match(/[^-]*$/) - b.replace(".md", "").match(/[^-]*$/)
        }).concat(nosortList)
    }

    return root
}

function readDirSync(path, root) {
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            readDirSync(path + ele, root)
        } else {
            if (checkFileType(ele)) {
                root.push(prefixPath(path, ele))
            }
        }
    })
}

function checkFileType(path) {
    return path.includes(".md")
}

function prefixPath(basePath, dirPath) {
    let index = basePath.indexOf("/")
        // 去除一级目录地址
    basePath = basePath.slice(index, path.length)
        // replace用于处理windows电脑的路径用\表示的问题
    return path.join(basePath, dirPath).replace(/\\/g, "/")
}


// const { getChildren } = require("vuepress-sidebar-atuo")

module.exports = {
    '/blogs/': [{
        title: '基础知识',
        collapsable: true,
        children: getChildren('./docs/blogs')
    }]
}

// module.exports = {
//     '/views/': [{
//             title: '基础知识',
//             collapsable: true,
//             children: getChildren('./docs/views/basis/')
//         },
//         {
//             title: '高级进阶',
//             collapsable: true,
//             children: getChildren('./docs/views/advanced/')
//         },
//         {
//             title: 'Bug',
//             collapsable: true,
//             children: getChildren('./docs/views/Bug/')
//         },
//         {
//             title: '面试宝典',
//             collapsable: true,
//             children: getChildren('./docs/views/interview/')
//         },
//     ],
//     '/coms/': [{
//         title: '基础组件',
//         collapsable: true,
//         children: getChildren('./docs/coms/basicsCom/')
//     }, {
//         title: '业务组件',
//         collapsable: true,
//         children: getChildren('./docs/coms/professionCom/')
//     }, ],
//     '/jottings/': [{
//         title: '随笔',
//         collapsable: true,
//         children: getChildren('./docs/jottings/')
//     }]
// }