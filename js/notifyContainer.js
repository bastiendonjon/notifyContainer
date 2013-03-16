(function($)
{
    $.fn.notifyContainer = function(options)
    {
        // Build mains parameters
        var params = $.extend({}, $.fn.notifyContainer.defaults, options);
        
        return this.each(function()
        {
            var _this = this;
            
            // Remove all notifyContainer for current container
            $(_this).find(".notifyContainer").remove();
            
            // Get container position
            var offset = $(_this).offset();

            var notifyContainerParams = {
                "class": "notifyContainer notifyContainer-container notifyContainer-" + params.class,
                "css" : {
                    "position": 'fixed',
                    "top": offset.top + "px",
                    "left": offset.left + "px",
                    "width": $(_this).outerWidth(true),
                    "display": "none"
                }
            }
            
            // Build close element
            var elemClose = $("<a>", {
                "href": "#",
                "class": "notifyContainer-close"
            }).text("X")
            .on("click", function(){
                $(this).closest(".notifyContainer").hide();
            });
            
            // Build final renderer
            var output = $("<div>", notifyContainerParams);
                output.html(formatMessage(params.messages));
                output.append(elemClose);
                output.appendTo(_this);
            
            $(_this).find(".notifyContainer").show();
            
            if(typeof(params.duration) === 'number'){
                setTimeout(function() {
                    $(_this).find(".notifyContainer").hide();
                }, params.duration);
            }
            
        });
    };
    
    /**
     * Convert message to string
     * @param {mixed} messages
     * @returns {string}
     */
    function formatMessage(messages){
       var result = "";
       if(typeof(messages) === 'object'){
           result += "<ul>"
           for(var i in params.messages){
               result += "<li>" + messages[i] + "</li>";
           }
           result += "</ul>"
       }else{
           result = messages;
       }
       return result;
    }

    // Défaults parameters
    $.fn.notifyContainer.defaults = {
       "class": "success",
       "duration" : 5000 // in ms
    };
    
})(jQuery);