function hash(string) {
    var hash = 0
    if (string.length == 0) return hash
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }

    return hash
}

const users = [
    {
        username: "911",
        password: 1553921598,
        access: 3
    },
    {
        username: "EthanBlaisAlarms",
        password: 476661430,
        access: 5
    },
    {
        username: "Access0Test",
        password: -173674050,
        access: 0
    },
    {
        username: "Access1Test",
        password: -173674050,
        access: 1
    },
    {
        username: "Access2Test",
        password: -173674050,
        access: 2
    },
    {
        username: "Access3Test",
        password: -173674050,
        access: 3
    },
    {
        username: "Access4Test",
        password: -173674050,
        access: 4
    }
]
