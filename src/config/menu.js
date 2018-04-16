module.exports = {
    rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6'],//左边导航主菜单配置
    menusData: [
        {
            name: '数据统计',
            icon: 'dashboard',
            key: 'sub1',
            children: [
                {
                    name: '数据分析',
                    icon: 'form',
                    path: '/routes/Analyze',
                }
            ]
        },
        {
            name: '详情页',
            icon: 'dashboard',
            key: 'sub2',
            children: [
                {
                    name: '高级详情',
                    icon: 'form',
                    path: '/routes/Detail',
                }
            ]
        },
        {
            name: "列表页面",
            icon: 'dashboard',
            key: 'sub3',
            children: [
                {
                    name: '普通列表1',
                    icon: 'form',
                    path: '/routes/NormalList',
                },
                {
                    name: '普通列表2',
                    icon: 'form',
                    path: '/routes/NormalList2',
                }
            ]
        },
        {
            name: '表格页面',
            icon: 'dashboard',
            key: 'sub4',
            children: [
                {
                    name: '表格翻页',
                    icon: 'form',
                    path: '/routes/Table1',
                },
                {
                    name: '表格过滤',
                    icon: 'form',
                    path: '/routes/Table2',
                },
                {
                    name: '表格展开',
                    icon: 'form',
                    path: '/routes/Table3',
                },
                {
                    name: '编辑表格',
                    icon: 'form',
                    path: '/routes/Table4',
                }
            ]
        },
        {
            name: '导航五',
            icon: 'dashboard',
            key: 'sub5',
            children: [
                {
                    name: 'item',
                    icon: 'form',
                    path: '/routes/Detail',
                }
            ]
        },
    ]
} 
