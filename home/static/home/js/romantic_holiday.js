document.addEventListener( 'DOMContentLoaded', function(){
                var _arr = 1 == 1 ? true : false,
                    _dot = 1 == 0 ? true : false;

                var slider = tns({
                    container: '#wd-dest-id-5cf4150a2329r',
                    controls: false,
                    nav: _dot,
                    items: 5,
                    autoHeight: true,
                    mouseDrag: true,
                    loop: false,
                    responsive: {
                        240: {
                            items: 1
                        },
                        767: {
                            items: 2
                        },
                        1024: {
                            items: 5,
                            controls: _arr
                        }
                    }
                });
            } );