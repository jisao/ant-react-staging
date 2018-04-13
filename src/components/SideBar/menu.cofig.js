export const menus = {
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
                name: '导航三',
                icon: 'dashboard',
                key: 'sub3',
                children: [
                    {
                        name: 'item',
                        icon: 'form',
                        path: '/routes/Detail',
                    }
                ]
            },
            {
                name: '导航四',
                icon: 'dashboard',
                key: 'sub4',
                children: [
                    {
                        name: 'item',
                        icon: 'form',
                        path: '/routes/Detail',
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
