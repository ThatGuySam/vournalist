import { assert, expect, test } from 'vitest'

import { punctuateText } from '../src/helpers/punctuation'


const raw = `hi everyone my name is chris martin i'm here with my colleague julian pistorius we're here talking about exosphere exosphere reimagines openstack horizon for researchers and data scientists so if you have some kind of compute intensive workload or server workload you can run that on a big computer or a persistent computer or a disposable computer on an openstack cloud at your institution or a commercial cloud exosphere makes this really easy and includes all the batteries you get to create instances you get a one-click shell in your browser and a desktop environment and you don't have to fuss with network security groups or ssh key pairs or other advanced it concepts uh you just open the app launch your instance and get to work our goal is that it just works with openstack clouds it's a client-side web application`


const expectedPunctuation = `
Hi everyone. my name is Chris Martin. I'm here with my colleague, Julian Pistorius. We're here talking about Exosphere. 

Exosphere reimagines openstack horizon for researchers and data scientists. So if you have some kind of compute, intensive workload or server workload, you can run that on a big computer or a persistent computer or a disposable computer on an Openstack cloud at your institution or a commercial cloud. 

Exosphere makes this really easy and includes all the batteries you get to create instances. You get a one-click shell in your browser and a desktop environment and you don't have to fuss with network security groups or ssh key pairs or other advanced it concepts. 

You just open the app, launch your instance and get to work. Our goal is that it just works with openstack clouds. It's a client-side web application.`
.replace(/(\r\n|\n|\r)/gm, '')


test('Can punctuate text', async () => {

    const punctuated = await punctuateText( raw )

    // Create segments of chars 
    // so we can see any differences within the console
    const segmentLength = 50

    for ( let i = 0; i < punctuated.length; i += segmentLength ) {
        // console.log( punctuated.substring( i, i + segmentLength ) )

        const provided = punctuated.substring( i, i + segmentLength )

        // Get expected punctuation segment
        const expected = expectedPunctuation.substring( i, i + segmentLength )

        expect( provided.toLowerCase() ).toEqual( expected.toLowerCase() )
    }

    
})