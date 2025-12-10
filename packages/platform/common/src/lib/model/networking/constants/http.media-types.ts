import { HTTPMediaTypeKey } from '../enums'
import { HTTPMediaType } from '../interfaces/http.media-type'

export const HTTPMediaTypes: Record<HTTPMediaTypeKey, HTTPMediaType> = {
    any: {type: '*', subtype: '*'},
    plainText: {type: 'text', subtype: 'plain', parameters: {'charset': 'utf-8'}},
    html: {type: 'text', subtype: 'html', parameters: {'charset': 'utf-8'}},
    css: {type: 'text', subtype: 'css', parameters: {'charset': 'utf-8'}},
    urlEncodedForm: {type: 'application', subtype: 'x-www-form-urlencoded', parameters: {'charset': 'utf-8'}},
    formData: {type: 'multipart', subtype: 'form-data'},
    multipartFormData: {type: 'multipart', subtype: 'mixed'},
    json: {type: 'application', subtype: 'json', parameters: {'charset': 'utf-8'}},
    jsonAPI: {type: 'application', subtype: 'vnd.api+json', parameters: {'charset': 'utf-8'}},
    jsonSequence: {type: 'application', subtype: 'json-seq', parameters: {'charset': 'utf-8'}},
    xml: {type: 'application', subtype: 'xml', parameters: {'charset': 'utf-8'}},
    dtd: {type: 'application', subtype: 'dtd', parameters: {'charset': 'utf-8'}},
    pdf: {type: 'application', subtype: 'pdf'},
    zip: {type: 'application', subtype: 'zip'},
    tar: {type: 'application', subtype: 'x-tar'},
    gzip: {type: 'application', subtype: 'x-gzip'},
    bzip2: {type: 'application', subtype: 'x-bzip2'},
    binary: {type: 'application', subtype: 'octet-stream'},
    gif: {type: 'image', subtype: 'gif'},
    jpeg: {type: 'image', subtype: 'jpeg'},
    png: {type: 'image', subtype: 'png'},
    svg: {type: 'image', subtype: 'svg+xml'},
    audio: {type: 'audio', subtype: 'basic'},
    midi: {type: 'audio', subtype: 'x-midi'},
    mp3: {type: 'audio', subtype: 'mpeg'},
    wave: {type: 'audio', subtype: 'wav'},
    ogg: {type: 'audio', subtype: 'vorbis'},
    avi: {type: 'video', subtype: 'avi'},
    mpeg: {type: 'video', subtype: 'mpeg'}
}

