(function( $ ) {
     $.fn.jLightenDarken = function( ) {
        LightenDarkenTxT( 'txtLighten' );
        LightenDarkenTxT( 'txtDarken' );
        LightenDarkenBG( 'bgLighten' );
        LightenDarkenBG( 'bgDarken' );
    };
   // Private functions.
   function is_null_or_empty( value ) {
    return value == null || value == '' || value==='rgba(0, 0, 0, 0)' || value==='transparent';
    };
  function get_background_of(element) {
    var parent = element.parent();
    var result = element.css('background-color');
    if (is_null_or_empty(result)) {
        result = parent && parent != null ? get_background_of(parent) : "";
    }
    return result;
    };
  function get_color_of(element) {
    var parent = element.parent();
    var result = element.css('color');
    if (is_null_or_empty(result)) {
        result = parent && parent != null ? get_color_of(parent) : "";
    }
    return result;
    };
  function splitCSSClassObjects(oArr) {
    var $oArr = oArr.split("-"); 
    var $ot = [];
    if($oArr.length!=2) {
    // alert($oArr.length);
    } else {
     $ot['functionality'] = $oArr[0];
     $ot['amount'] = parseInt($oArr[1]);
     return $ot;
    }
	};
  function  LightenDarkenTxT( strngArr ) {
        var $klass;
        var $klassParts;
        var $klassKolore =[];
        var $amount = [];
        var $amountParts;
        var $multiplier;
        var finalColor =[];
        $multiplier = 0;
        for(j=0;j<strngArr.length;j++) {
                if(strngArr=='txtLighten') {
                    $multiplier = 1;
                }
                if(strngArr=='txtDarken') {
                    $multiplier = -1;
                }
            $klass = $('div[class*="'+strngArr+'"]');  
            var l=0;
            var rgbArr = [];
            var rgb;
             $.each($klass,function() {
                     $klassKolor = get_color_of($(this));  
                   console.log($klassKolor);
                rgbArr.push($klassKolor.match(/\d+/g));
                $klassKolore.push($klassKolor);     
                $klassParts = $(this).prop('class').split(" ");
                    for(k=0;k<$klassParts.length;k++) {
                        if($klassParts[k].search(strngArr)!=-1) {
                         $amountParts = splitCSSClassObjects($klassParts[k]);
                            $amount.push($amountParts['amount']); 
                         }
                     }
            });
           for(l=0;l<rgbArr.length;l++) { 
               rgb=rgbArr[l];
               for(i=0;i<rgb.length;i++) {
                   rgb[i] =parseInt(rgb[i]) + $amount[l]*$multiplier ;
                       if (rgb[i]>=255) {
                          rgb[i] = 255;
                       }
                       if (rgb[i]<=0) {
                          rgb[i] = 0;
                       }
                    rgb[i] = rgb[i].toString(16);
                    if(rgb[i].length<2) {
                       rgb[i] = '0'+rgb[i];
                    }
               }    
            finalColor.push('#'+rgb.join(""));
           } 
         } 
         $.each($klass,function(m) {
         $(this).css('color',finalColor[m]);
         });
    };
    function  LightenDarkenBG( strngArr ) {
        var $klass;
        var $klassParts;
        var $klassKolore =[];
        var $amount = [];
        var $amountParts;
        var $multiplier;
        var finalColor =[];
        $multiplier = 0;
        for(j=0;j<strngArr.length;j++) {
                if(strngArr=='bgLighten') {
                    $multiplier = 1;
                }
                if(strngArr=='bgDarken') {
                    $multiplier = -1;
                }
            $klass = $('div[class*="'+strngArr+'"]');  
            var l=0;
            var rgbArr = [];
            var rgb;
             $.each($klass,function() {
                     $klassKolor = get_background_of($(this));  
                   console.log($klassKolor);
                rgbArr.push($klassKolor.match(/\d+/g));
                $klassKolore.push($klassKolor);     
                $klassParts = $(this).prop('class').split(" ");
                    for(k=0;k<$klassParts.length;k++) {
                        if($klassParts[k].search(strngArr)!=-1) {
                         $amountParts = splitCSSClassObjects($klassParts[k]);
                            $amount.push($amountParts['amount']); 
                         }
                     }
            });
           for(l=0;l<rgbArr.length;l++) { 
               rgb=rgbArr[l];
               for(i=0;i<rgb.length;i++) {
                   rgb[i] =parseInt(rgb[i]) + $amount[l]*$multiplier ;
                       if (rgb[i]>=255) {
                          rgb[i] = 255;
                       }
                       if (rgb[i]<=0) {
                          rgb[i] = 0;
                       }
                    rgb[i] = rgb[i].toString(16);
                    if(rgb[i].length<2) {
                       rgb[i] = '0'+rgb[i];
                    }
               }    
            finalColor.push('#'+rgb.join(""));
           } 
         } 
         $.each($klass,function(m) {
         $(this).css('background-color',finalColor[m]);
         });
    };
    // ...
// End of closure.
})( jQuery );








