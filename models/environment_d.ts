declare global{
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_USER:string,
			DATABASE_PASSWORD:string,
			CONNECTION_STRING:string
		}
	}
}

export {}