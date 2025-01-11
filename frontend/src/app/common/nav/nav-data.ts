export const navbarData = [
    {
        icon: 'fa fa-wrench',
        title: 'Settings',
        type: 'dropdown',
        active: false,
        roles: ['Admin'],
        submenus:
        [
            {
                routerLink: 'users',
                title: 'Users'
            },
            {
                routerLink: 'machines',
                title: 'Machines'
            },
            {
                routerLink: 'tyres',
                title: 'Tyres'
            }
        ]
    },
    {
        routerLink: 'production',
        icon: 'fa fa-industry',
        title: 'Production',
        roles: ['Admin','Production Operator','Quality Supervisor','Business Unit Leader'],
        active: false
    },
    {
        routerLink: 'sales',
        icon: 'fa fa-truck',
        title: 'Sales',
        roles: ['Admin', 'Quality Supervisor','Business Unit Leader'],
        active: false
    },
    {
        routerLink: 'logout',
        icon: 'fa fa-sign-out',
        title: 'Logout',
        active: false
    }
];