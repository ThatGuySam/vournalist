

export default async function (req, res) {
    
    // const options = parseOptionsFromPath( req.url, { supressErrors: !!req?.supressErrors })

    try {

        const works = true

        if ( works ) {

            res.json( 'Can respond!' )
        
            return
        }

        throw new Error('Not implemented')

    } catch ( error ) {

        console.error( 'error', error )

        res.status( 500 ).json( error )

    }
}