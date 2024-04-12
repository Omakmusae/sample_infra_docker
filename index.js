
import fastify from "fastify";
import db from "@fastify/mysql";
import fastifyRedis from "@fastify/redis";


const apiServer = fastify({
    logger: true
})

//1. MySQL 연결 설정
//connectionString: "mysql://유저이름:db비밀번호@127.0.0.1/db스키마이름",
// apiServer.register(db, {
//     connectionString: 'mysql://root:calsadmin1!@localhost:3306/docker'
// })
// apiServer.get('/testMysql', function (req, reply) {
//     apiServer.mysql.query(
//         'SELECT * FROM qt_user',
//         function onResult(err, result) {
//             reply.send(err || result)
//         }
//     )
//     console.log('mysql db 조회 성공')
// })

//2. Redis 연결 설정
//https://github.com/fastify/fastify-redis
await apiServer.register(fastifyRedis, {
    url: 'redis://cachee',  //host: '127.0.0.1' '172.27.0.3'  //'redis-server' url: 'redis://cachee'
    port: 6379,
    // password: 'your strong password here',
    // family: 4   // 4 (IPv4) or 6 (IPv6)
})

await apiServer.get('/testRedis', async (req, reply) => {
    console.log("testRedis !!!!!")
    const { redis } = apiServer
    await redis.get('os', (err, val) => {
        reply.send(err || val)
    })
    done()
})

await apiServer.get('/test', (req, res) => {

    console.log("test !!!!!")

    return "test !!!!!"
})

const serverStart = async () => {
    try {
        await apiServer.listen({ host: "0.0.0.0", port: 3000 })
        console.log('Server Start!!')
    } catch (error) {
        apiServer.log.error(error)
        process.exit(1)
    }
}
console.log('서버 시작')

serverStart()