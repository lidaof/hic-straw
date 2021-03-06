import { assert } from 'chai';

import HicFile from '../src/hicFile'
import NodeLocalFile from '../src/io/nodeLocalFile'

suite('HicFile', function () {

    test('local file read header', async function () {

        const file = new NodeLocalFile({
            "path": require.resolve("./data/test_chr22.hic"),
        })
        const hicFile = new HicFile({file: file})

        await hicFile.readHeader()
        assert.equal(hicFile.magic, "HIC")
    })

    test('local file read matrix', async function () {

        const file = new NodeLocalFile({
            "path": require.resolve("./data/test_chr22.hic"),
        })
        const hicFile = new HicFile({file: file})
        const matrix = await hicFile.readMatrix(22, 22)
        assert.ok(matrix)
    })


    test('local file read norm vector index', async function () {

        const file = new NodeLocalFile({
            "path": require.resolve("./data/test_chr22.hic"),
        })
        const hicFile = new HicFile({file: file})

        const normVectorIndex = await hicFile.getNormVectorIndex()
        assert.ok(normVectorIndex)

    })

    // getNormalizationVector(type, chrIdx, unit, binSize)

    test('local file read norm vector', async function () {

        const file = new NodeLocalFile({
            "path": require.resolve("./data/test_chr22.hic"),
        })
        const hicFile = new HicFile({file: file})

        const type = "KR"
        const chr = "22"
        const unit = "BP"
        const binSize = 100000
        const normVector = await hicFile.getNormalizationVector(type, chr, unit, binSize)
        assert.equal(normVector.data.length, 515)
        assert.ok(normVector)

    })

    test('remote file read header', async function () {

        const hicFile = new HicFile({
            "url": "https://s3.amazonaws.com/igv.broadinstitute.org/data/hic/intra_nofrag_30.hic",
            "loadFragData": false
        })

        await hicFile.readHeader()
        assert.equal(hicFile.magic, "HIC")

    })

})
