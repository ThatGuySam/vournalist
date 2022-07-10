import 'cross-fetch/polyfill'


async function fetchPunctuatedForSegment ( text ) {
    console.log( 'Fetching punctuated text for segment:', text.substring( 0, 100 ) )

    const apiUrl = 'https://api-inference.huggingface.co/models/oliverguhr/fullstop-punctuation-multilang-large'

    // console.log( 'VITE_HUGGINGFACE_TOKEN', import.meta.env.VITE_HUGGINGFACE_TOKEN )

    const response = await fetch( apiUrl, {
			headers: { Authorization: `Bearer ${ import.meta.env.VITE_HUGGINGFACE_TOKEN }` },
			method: 'POST',
			body: JSON.stringify({ inputs: text }),
		}
	)
    .catch( error => {
        console.error( 'error', error )
        throw new Error( 'Error fetching punctuated text' )
        return error
    })

	const result = await response.json()

    // Check if it's a currently loading error
    if ( result?.error && result.error.includes( 'currently loading' ) ) {
        console.log( 'Error:', result.error )
        throw new Error( 'Hugging Face is currently loading the model' )
    }

    // console.log( 'result', result )

	return result
}

async function fetchPunctuatedText ( text ) {
    // Create segments of chars 
    // so Hugging Face doesn't trim the text
    const segmentLength = 2000

    const segments = []

    for ( let i = 0; i < text.length; i += segmentLength ) {
        const punctuated = await fetchPunctuatedForSegment( text.substring( i, i + segmentLength ) )

        segments.push( punctuated )
    }
   
    // Return merged segments
    return segments.flat()
}

function createPunctuatedTextFromEntity ( entity ) {
    // For unknown entities, we use the original text
    if ( Number( entity.entity_group ) === 0 ) {
        return entity.word
    }

    const punctuationMark = entity.entity_group

    return `${ entity.word }${ punctuationMark }`
}


function cleanWords ( words ) {
    return words.replaceAll('uh','')
}

export async function punctuateText ( rawText ) {
    const cleanedText = cleanWords( rawText )

    const entities = await fetchPunctuatedText( cleanedText )

    const punctuatedSegments = []
    let previousSegment = ''

    for ( const entity of entities ) {
        const shouldCapitalize = previousSegment.length === 0 || previousSegment.endsWith('.')

        const rawSegment = createPunctuatedTextFromEntity( entity )

        // Capitalize the first letter of the segment, if needed
        const segment = shouldCapitalize ? (rawSegment.charAt(0).toUpperCase() + rawSegment.slice(1)) : rawSegment

        punctuatedSegments.push( segment )

        previousSegment = segment
    }

    return punctuatedSegments.join(' ')
}