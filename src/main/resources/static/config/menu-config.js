// 管理员菜单
window.adminMenuItems = [
    {
        index: '0',
        title: '主页',
        icon: 'fa-solid fa-house',
        url: '/admin/index' // 直接跳转，不带children
    },
    {
        index: '1',
        title: '图书管理',
        icon: 'fa-solid fa-book-open',
        children: [
            { index: '1-1', label: '图书列表', icon: 'fa-solid fa-list', url: '/admin/book/book' },
            { index: '1-2', label: '图书分类', icon: 'fa-solid fa-folder-open', url: '/admin/book/bookCategory' },
            { index: '1-3', label: '图书副本管理', icon: 'fa-solid fa-copy', url: '/admin/book/bookCopy' }
        ]
    },
    {
        index: '2',
        title: '读者管理',
        icon: 'fa-solid fa-users',
        children: [
            { index: '2-1', label: '读者列表', icon: 'fa-solid fa-user', url: '/admin/reader/reader' }
        ]
    },
    {
        index: '3',
        title: '借阅管理',
        icon: 'fa-solid fa-exchange',
        children: [
            { index: '3-1', label: '借阅列表', icon: 'fa-solid fa-check', url: '/admin/borrow/borrowRecord' },
            { index: '3-3', label: '预约管理', icon: 'fa-solid fa-clock', url: '/borrowing/reservations' },
            { index: '3-4', label: '逾期管理', icon: 'fa-solid fa-exclamation-triangle', url: '/borrowing/overdues' }
        ]
    },
    {
        index: '4',
        title: '系统管理',
        icon: 'fa-solid fa-cog',
        children: [
            { index: '4-1', label: '用户管理', icon: 'fa-solid fa-users', url: '/admin/system/user' },
            { index: '4-2', label: '角色管理', icon: 'fa-solid fa-list', url: '/admin/system/role' },
            { index: '4-3', label: '部门管理', icon: 'fa-solid fa-building', url: '/admin/system/dept' }
        ]
    },
    {
        index: '5',
        title: '用户中心',
        icon: 'fa-solid fa-user-circle',
        children: [
            { index: '5-1', label: '修改密码', icon: 'fa-solid fa-key', url: '/user/password' }
        ]
    }
];

// 读者菜单
window.readerMenuItems = [
    {
        index: '0',
        title: '主页',
        icon: 'fa-solid fa-house',
        url: '/reader/index' // 直接跳转，不带children
    },
    {
        index: '1',
        title: '借阅管理',
        icon: 'fa-solid fa-exchange',
        children: [
            { index: '1-1', label: '我的借阅', icon: 'fa-solid fa-book', url: '/reader/borrow-records' },
            { index: '1-2', label: '我的预约', icon: 'fa-solid fa-clock', url: '/reader/reservations' },
            { index: '1-3', label: '续借申请', icon: 'fa-solid fa-sync', url: '/reader/renewals' }
        ]
    },
    {
        index: '2',
        title: '个人中心',
        icon: 'fa-solid fa-user-circle',
        children: [
            { index: '2-1', label: '个人信息', icon: 'fa-solid fa-id-card', url: '/reader/profile' },
            { index: '2-2', label: '修改密码', icon: 'fa-solid fa-key', url: '/user/password' }
        ]
    }
];