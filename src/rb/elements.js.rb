
import './packages/template-rjs-0.1.1/elements'
import './packages/gallery-rjs-0.1.0/elements'

import 'ElmHeader', './elements/elm_header'
window.custom_elements.define('elm-header', ElmHeader)

import 'ElmFooter', './elements/elm_footer'
window.custom_elements.define('elm-footer', ElmFooter)

import 'ElmLazyImageTest', './elements/elm_lazy_image_test'
window.custom_elements.define('elm-lazy-image-test', ElmLazyImageTest)
