const list = [
    {
        nick: "大明",
        phone: "1234",
        name: "daming",
        subject: "医学",
        job: "doctor",
        year: 1,
        updateTime: "2021-9-12"
    },
    {
        nick: "二明",
        phone: "12345",
        name: "erming",
        subject: "医学",
        job: "doctor",
        year: 2,
        updateTime: "2021-9-12"
    }
]
const tableData = [
    {
        date: '2016-05-02',
        name: '小明',
        address: '上海市普陀区金沙江路 1518 弄'
    }, {
        date: '2016-05-04',
        name: '小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    }, {
        date: '2016-05-01',
        name: '王二',
        address: '上海市普陀区金沙江路 1519 弄'
    }, {
        date: '2016-05-03',
        name: '王三',
        address: '上海市普陀区金沙江路 1516 弄'
    }]
module.exports = [
    {
        url: '/vue-admin-template/test/list',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data: {
                    total: list.length,
                    items: list,
                    tableData: tableData
                }
            }
        }
    }
]
