/**
 * Created by weiwei on 2017/2/13.
 */


;(function($) {
        $.fn.timeLine = function (options) {
            var defaults = {
                url : "./data/data.json"
            };
            var settings = $.extend(defaults, options || {});
            var creatContent = function (_data) {
                $.each(_data,function (index,value) {
                    var str = "";
                    //console.log(_data[index].img);
                    if(_data[index]){
                        if (!_data[index].img){
                            str += "<div class='timeline-row'>"+
                                "<div class='timeline-time'>"+_data[index].step+"</div>"+
                                "<div class='timeline-icon'>"+
                                "<div class='bg-warning'>"+
                                "<i class='fa fa-handshake-o'></i>"+
                                "</div>"+
                                "</div>"+
                                "<div class='panel timeline-content'>"+
                                "<div class='panel-body'>"+
                                "<h2>"+_data[index].title+"</h2>"+
                                "<p>"+_data[index].content+"</p>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                        }else {
                            str += "<div class='timeline-row'>"+
                                "<div class='timeline-time'>"+_data[index].step+"</div>"+
                                "<div class='timeline-icon'>"+
                                "<div class='bg-warning'>"+
                                "<i class='fa fa-handshake-o'></i>"+
                                "</div>"+
                                "</div>"+
                                "<div class='panel timeline-content'>"+
                                "<div class='panel-body'>"+
                                "<h2>"+_data[index].title+"</h2>"+
                                "<img class='img-responsive' src="+_data[index].imgUrl+" />"+
                                "<p>"+_data[index].content+"</p>"+
                                "</div>"+
                                "</div>"+
                                "</div>"
                        }
                        $(".timeline").append(str);
                    }else {
                        return false;
                    }
                })
            };
            var getData = function () {
                $.ajax({
                    type : "get",
                    url  : settings.url,
                    dataType : "json",
                    beforeSend : function () {
                        $("body").addClass("mask");
                    },
                    success : function (data) {
                        creatContent(data.listItem);
                        $("body").removeClass("mask");
                        timelineAnimate();
                    },
                    error : function () {
                        alert("加载失败，请检查您的网络。")
                    }
                })
            };
            var timelineAnimate = function(elem) {
                return $(".timeline.animated .timeline-row").each(function(index) {
                    var bottom_of_object, bottom_of_window;
                    bottom_of_object = $(this).position().top + $(this).outerHeight();
                    bottom_of_window = $(window).scrollTop() + $(window).height();
                    if (bottom_of_window > bottom_of_object) {
                        return $(this).addClass("active");
                    }
                });
            };
            getData();
            return $(window).scroll(function() {
                return timelineAnimate();
            });
        };
})(jQuery);