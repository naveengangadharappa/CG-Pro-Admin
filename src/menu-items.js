export default {
    items: [
        {
            id: 'navigation',
            title: 'Employee',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Users',
                    type: 'collapse',
                    url: '/dashboard',
                    // url: '/dashboard/default',
                    icon: 'feather icon-home',
                    children: [
                        {
                            id: 'bootstrap',//'button',
                            title: 'Master Users',
                            type: 'item',
                            url: '/Users'//'/button'
                        },
                        {
                            id: 'badges',
                            title: 'Employees',
                            type: 'item',
                            url: '/Employee'
                        },
                    ]
                }
            ]
        },
        {
            id: 'ui-element',
            title: 'Masters',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'Levels',
                    title: 'Levels Details',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'Levels',
                            title: 'Levels',
                            type: 'item',
                            url: '/Levels'
                        },
                        {
                            id: 'SubLevel',
                            title: 'SubLevel',
                            type: 'item',
                            url: '/SubLevels'
                        },
                        {
                            id: 'pattern',
                            title: 'Pattern',
                            type: 'item',
                            url: '/Pattern'
                        }
                    ]
                }, {
                    id: 'Question',
                    title: 'Question Details',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'Questions',
                            title: 'Questions',
                            type: 'item',
                            url: '/Questions'
                        }
                    ]
                }
            ]
        }
    ]
}




