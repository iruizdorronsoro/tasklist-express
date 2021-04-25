import connection from './server.js'

import './database'

connection.server.listen(connection.port, () => {
	console.log('Server on port: ', connection.port)
})
