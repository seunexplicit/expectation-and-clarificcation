declare global{
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_USER:string,
			DATABASE_PASSWORD:string,
			DATABASE_HOST:string,
			DATABASE:string
		}
	}
}

export {}