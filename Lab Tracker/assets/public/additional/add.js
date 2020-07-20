 // type="text/javascript">
 $(document).ready(function() {
     var myElement = document.querySelector("header");
     // construct an instance of Headroom, passing the element
     var headroom = new Headroom(myElement);
     headroom.init();
     $('img').addClass('img-responsive');
     $('.images').slick({
         prevArrow: '<i class="fa fa-chevron-left"></i>',
         nextArrow: '<i class="fa fa-chevron-right"></i>',
         autoplay: true,
         dots: false,
         fade: false,
         speed: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         responsive: [{
             breakpoint: 768,
             settings: {
                 arrows: true,
                 autoplay: false
             }
         }, {
             breakpoint: 480,
             settings: {
                 arrows: false,
                 slidesToShow: 1,
                 slidesToScroll: 1
             }
         }]

     });

     // news and notice

     $('.slider-wrapper').slick({
         arrows: false,
         autoplay: true,
         dots: false,
         fade: false,
         speed: 1000,
         adaptiveHeight: true,
         vertical: true,
         pauseOnHover: true,
         slidesToShow: 3,
         slidesToScroll: 1,

     });

     // message for students

     $('.message-carousel').slick({
         arrows: false,
         autoplay: true,
         dots: true,
         fade: false,
         speed: 1000,
         slidesToShow: 1,
         slidesToScroll: 1,
         adaptiveHeight: true,
     });

     // concern-logo

     $('.logo').slick({
         arrows: false,
         autoplay: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         responsive: [{
             breakpoint: 767,
             settings: {
                 slidesToShow: 2,
                 slidesToScroll: 1,
             }
         }, {
             breakpoint: 480,
             settings: {
                 slidesToShow: 1,
                 slidesToScroll: 1
             }
         }]
     });
     $('.image-link').magnificPopup({
         type: 'image',
         mainClass: 'mfp-with-zoom', // this class is for CSS animation below
         gallery: {
             enabled: true,
             navigateByImgClick: true
         },
         zoom: {
             enabled: true, // By default it's false, so don't forget to enable it

             duration: 400, // duration of the effect, in milliseconds
             easing: 'ease-in-out', // CSS transition easing function
         }

     });
     if ($(".carrer_accordian table tr th").length > 0) {
         $(".carrer_accordian table tr th").click(function() {
             if ($(this).hasClass("active")) {
                 jQuery(this).removeClass("active");
             } else {
                 jQuery(this).closest('table').find('th.active').removeClass("active");
                 jQuery(this).toggleClass("active");
             }

         });
     }


     var active_class = $('#main_menu li.active').attr('id');
     $('#sub_menu_inner .' + active_class).removeClass('hidden');
     $('#sub_menu_inner .' + active_class).first().css('border-left', 'none');
     $('#sub_menu_inner .' + active_class).last().css('border-right', 'none');
     $('#main_menu li').on('click', function() {
         var li_id = $(this).attr('id');
         if ($('#sub_menu_inner').length > 0) {
             window.location = $('#sub_menu_inner .' + li_id + ' a').first().attr('href');
         } else {
             window.location = $(this).find('.sub-menu li a').first().attr('href');
         }
     });
 });
 //>

 //Additional js added by surendra-->
 src = "assets/public/additional/jquery.validate.min.js" > //>
     //accordian->faq pages-->
     // type="text/javascript">
     function toggleIcon(e) {
         $(e.target)
             .prev('.panel-heading')
             .find(".more-less")
             .toggleClass('fa-minus');
     }
 $(document).ready(function() {
     $('.panel-group').on('hidden.bs.collapse', toggleIcon);
     $('.panel-group').on('shown.bs.collapse', toggleIcon);

     $('.panel-collapse').on('show.bs.collapse', function() {
         $(this).siblings('.panel-heading').addClass('active');
     });

     $('.panel-collapse').on('hide.bs.collapse', function() {
         $(this).siblings('.panel-heading').removeClass('active');
     });
 });
 //>
 //Contact form->home,contact-->
 // type="text/javascript">
 $(document).ready(function() {
     if ($('#contact_form').length > 0) {
         $('#contact_form_submit').on('click', function() {
             var valid_data = $('#contact_form').valid();
             if (valid_data) {
                 var form_data = $('#contact_form :input').serialize();
                 $('#contact_message').html('');
                 $.ajax({
                     url: 'http://sagarmatha.edu.np/cms/feedback/insert_feedback_ajaxcall',
                     data: form_data + "&action=feedback_data",
                     type: "POST",
                     success: function(msg) {
                         var data = JSON.parse(msg);
                         if (data['type'] == 'verror') { //server side validation.
                             (data['first_name'] != '') ? $('#first_name').addClass('error'): $('#first_name').removeClass('error');
                             (data['last_name'] != '') ? $('#last_name').addClass('error'): $('#last_name').removeClass('error');
                             (data['phone'] != '') ? $('#phone').addClass('error'): $('#phone').removeClass('error');
                             (data['email'] != '') ? $('#email').addClass('error'): $('#email').removeClass('error');
                             (data['message'] != '') ? $('#message').addClass('error'): $('#message').removeClass('error');
                             $('#contact_message').html('<p style="color:pink" class="error">' + data['contact_message'] + '</p>');
                             $('#contact_message p').delay('4000').fadeOut();
                         } else if (data['type'] == 'error') {
                             $('.error').removeClass('error');
                             $('#contact_message').html('<p style="color:pink" class="error">' + data['contact_message'] + '</p>');
                             $('#contact_message p').delay('4000').fadeOut();
                         } else if (data['type'] == 'success') {
                             $('.error').removeClass('error');
                             $('#contact_form :input').val('');
                             $('#contact_message').html('<p style="color:turquoise" class="success">' + data['contact_message'] + '</p>');
                             $('#contact_message p').delay('4000').fadeOut();
                         } else {
                             $('.error').removeClass('error');
                         }
                     },
                     beforeSend: function() {
                         $('#contact_form_submit').addClass('hidden');
                         $('#contact_form_loder').removeClass('hidden');
                     },
                     complete: function() {
                         $('#contact_form_submit').removeClass('hidden');
                         $('#contact_form_loder').addClass('hidden');
                     }
                 });
             }
         });
     }
     //--Subscribtion form for footer
     if ($('#subscribe_form').length > 0) {
         $('#subscribe_button').on('click', function() {
             var valid_subscribe = $('#subscribe_form').valid();
             if (valid_subscribe) {
                 var subscriber_email = $('#subscriber_email').val();
                 $.ajax({
                     url: 'http://sagarmatha.edu.np/home/subscribe',
                     type: 'GET',
                     data: {
                         'email': subscriber_email
                     },
                     success: function(response) {
                         if ($.trim(response) == 'error') {
                             $("#subscribe_message").html('<span style="color:red">Please make sure that your email address is valid!</span>');
                             $("#subscribe_message span").delay('3000').fadeOut();
                         } else {
                             $("#subscribe_message").html('<span style="color:green">' + $.trim(response) + '</span>');
                             $("#subscribe_message span").delay('3000').fadeOut();
                         }
                         $('#subscriber_email').val('');
                     },
                     beforeSend: function() {
                         $('#subscribe_button').addClass('hidden');
                         $('.subscribe_loader').removeClass('hidden');
                     },
                     complete: function() {
                         $('#subscribe_button').removeClass('hidden');
                         $('.subscribe_loader').addClass('hidden');
                     }
                 });
             }
         });
     }

     //--notice form for header or modal window
     if ($('#notice_anchor').length > 0) {
         $('#notice_anchor').on('click', function() {
             $('#noticeModal').modal({
                 show: true,
                 backdrop: 'static',
                 keyboard: false
             });
         });
     }
     if (window.location.href == 'index.html') {
         $('#noticeModal').modal({
             show: true,
             backdrop: 'static',
             keyboard: false,
         });
         $('#noticeModal').on('shown.bs.modal', function() {
             $('.sticky-header').css('z-index', '0');
         });
         $('#noticeModal').on('hidden.bs.modal', function() {
             $('.sticky-header').css('z-index', '9999');
         });
     }
     $('.introduction span').removeAttr('style');
 });
 //----About -> team page-->
 $('.team-wrapper table tr').each(function() {
     $(this).addClass('team-list');

     $(this).find('td').each(function() {
         $(this).addClass('text-center');
         $(this).find('img').attr('style', 'min-width:255px');
     });
 });
 //>
 //For TPU -->
 // type="text/javascript">
 var tputop = '';
 var objective = '';
 var activities_block = '';
 var contact_block = '';
 $('#tpu table').each(function(index, element) {
     if (index == 0) {
         tputop = tpuheader($(this));
     }
     if (index == 1) {
         objective = tpuObjective($(this));
     }
     if (index == 2) {
         activities_block = getActivitiesBlock($(this));
     }
     if (index == 3) {
         contact_block = getContactBlock($(this));
     }
 });
 $('#tpu').html(tputop + objective + activities_block + contact_block);
 $('#tpu').find('.goal-description ul').addClass('activities-list').removeClass('goal-description');
 $('#tpu').find('.goal-description p').each(function(index, item) {
     if ($.trim($(item).text()) === "") {
         $(item).remove();
     }
 });

 function getActivitiesBlock(element) {
     var activities_start = '<div class="placement-section"><div class="container-fluid"><div class="row"><div class="container"><div class="row">';
     var activities_end = '</div></div></div></div></div>';

     var activities = '';
     var block_count = 1;
     element.find('tr td').each(function(index, element) {
         var title = $(this).find('p:first-child').text();
         $(this).find('p:first-child').remove();
         var description = $(this).html();
         if (index == 0) {
             var activities_class = 'activities';
             var inside_class = '';
         } else if (index == 1) {
             var activities_class = 'goal';
             var inside_class = 'goal-details';
         } else if (index == 2) {
             var activities_class = 'goal';
         } else {
             var activities_class = 'goal placement-color';
             var inside_class = 'goal-details';
         }
         if (block_count == 1) {
             block_start = '<div class="activities_section_block">';
         } else {
             block_start = '';
         }
         if (block_count == 2) {
             block_end = '</div>';
         } else {
             block_end = '';
         }
         activities += block_start + '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 ' + activities_class + ' trainnig-grid">' +
             '<div class="activities-details ' + inside_class + '">' +
             '<div class="objective-title">' +
             '<h4>' + title + '</h4>' +
             '</div>' +
             '<div class="goal-description">' +
             '<p>' + description.trim() + '</p>' +
             '</div>' +
             '</div>' +
             '</div>' + block_end;
         block_count++;
         block_count = (block_count > 2) ? 1 : block_count;
     });
     return activities_start + activities + activities_end;
 }

 function getContactBlock(element) {
     var contacttitle = '';
     var contact_image = '';
     var contact_detail = '';
     var contact = '';
     if (element.find('tr:nth-child(1) td').length > 0 && element.find('tr:nth-child(1) td').text() != '') {
         contacttitle = element.find('tr:nth-child(1) td').text();
     }
     if (element.find('tr:nth-child(2) td:first-child img').length > 0 && element.find('tr:nth-child(2) td:first-child img').attr('src') != '') {
         contact_image = element.find('tr:nth-child(2) td:first-child img').attr('src');
     }

     if (element.find('tr:nth-child(2) td:nth-child(2)').length > 0 && element.find('tr:nth-child(2) td:nth-child(2)').text() != '') {
         contact_detail = element.find('tr:nth-child(2) td:nth-child(2)').html();
     }

     contact = '<div class="placement-unit">' +
         '<div class="container">' +
         '<div class="row">' +
         '<div class="objective-detail placement-font">' +
         '<h3 class="text-center">' + contacttitle + '</h3>' +
         '</div>' +
         '<div class="unit-description clearfix">' +
         '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 placement-img">' +
         '<img src="' + contact_image + '" class="img-responsive">' +
         '</div>' +
         '<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 contact-units">' +
         contact_detail +
         +'</div>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>';
     //return contact;
     return contact.replace('NaN', ' ');
 }

 function tpuObjective(element) {
     var objectivetitle = 'objective';
     var ojectivedescrtion = '';
     if (element.find('tr:nth-child(1) td').length > 0 && element.find('tr:nth-child(1) td').text() != '') {
         objectivetitle = element.find('tr:nth-child(1) td').text();
     }
     if (element.find('tr:nth-child(2) td').length > 0 && element.find('tr:nth-child(2) td').text() != '') {
         ojectivedescrtion = element.find('tr:nth-child(2) td').text();
     }
     var tobeappended = '' +
         '<div class="objective">' +
         '<div class="container">' +
         '<div class="row">' +
         '<div class="objective-title text-center">' +
         '<h4>' + objectivetitle + '</h4>' +
         '</div>' +
         '<div class="objective-detail placement-font">' +
         '<p style="font-size:20px !important">' + ojectivedescrtion + '</p>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>';
     return tobeappended
 }

 function tpuheader(element) {
     var topimage = $('#pageimage').text();
     var toptitle = 'DREAM BIG AND DARE TO CHASE IT';
     var description = '';
     if (element.find('img').attr('src').length > 0 && element.find('img').attr('src') != '') {
         topimage = element.find('img').attr('src');
     }

     if (element.find('tr:nth-child(2) td').length > 0 && element.find('tr:nth-child(2) td').text() != '') {
         toptitle = element.find('tr:nth-child(2) td').text();
     }

     if (element.find('tr:nth-child(3) td').length > 0 && element.find('tr:nth-child(3) td').text() != '') {
         description = element.find('tr:nth-child(3) td').html();
     }

     var tobeappended = '' +
         '<div class="container">' +
         '<div class="row">' +
         '<div class="col-xs-12 aboutus-wrapper">' +
         '<div class="about-intro">' +
         '<img src="' + topimage + '" class="img-responsive">' +
         '</div>' +
         '<div class="inner-text placement-font">' +
         '<p style="font-size:25px">' + toptitle + '</p>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '<div class="intro-description">' +
         '<div class="container">' +
         '<div class="row">' +
         '<div class="col-xs-12 introduction">' +
         '<p>' + description + '</p>' +
         '</div>' +
         '</div>' +
         '</div>' +
         '</div>';
     return tobeappended;
 }
 //>
 //Training Program and placement-->
 // type="text/javascript">
 $(document).ready(function() {
     if ($('#ptp').find('img').first().length > 0 && $('#ptp').find('img').first().attr('src') != '') {
         var img_tag = $('#ptp').find('img').first().attr('src');
         $('#ptp').find('img').first().remove();
     } else {
         var img_tag = $('#ptp_image').find('img').attr('src');
     }
     $('#ptp_image img').attr('src', img_tag);
     var tobeappended_desc = '';
     $('#ptp table tr td').each(function() {
         var image_src = '';
         var image_desc = '';

         if ($(this).find('img').first().length > 0) {
             image_src = $(this).find('img').first().attr('src').trim();
             $(this).find('img').first().remove();
         }
         var str = $(this).text();
         if (str.trim() != '') {
             image_desc = str.replace('NaN', '');
         }
         if (image_src !== '' && image_desc != '') {
             tobeappended_desc = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 placement-history">' +
                 '<div class="logo-grid">' +
                 '<img src="' + image_src + '" class="img-responsive">' +
                 '</div>' +
                 '<div class="logo-details text-center"><p>' +
                 image_desc +
                 +'</p></div>' +
                 '</div>';
             $('#history_text').append(tobeappended_desc);
         }
     });
     $('#ptp table').remove();
     var histroy_child_length = $('#history_text .placement-history').length;
     var cal = histroy_child_length % 3;
     if (cal == 1) {
         $('#history_text .placement-history').last().addClass('cg');
     }
 });
 //>
 //Blog all pages-->
 // type="text/javascript">
 $('#load_more').on('click', function() {
     var totalrecord = $(this).parent().attr('id');
     var displayed_record = $('.blog-item').length;
     $.ajax({
         async: false,
         url: 'http://sagarmatha.edu.np/home/getBlogAjax/',
         data: "total_record=" + displayed_record + "&action=getblogdata",
         type: "POST",
         success: function(msg) {
             var data = JSON.parse(msg);
             if (data['type'] == 'success') {
                 $('#blog-content').append(data['message']);
                 if (totalrecord <= data['totalrow']) {
                     $('.load-additonal').remove();
                 }
             }
         },
         beforeSend: function() {
             $('#load_more_loader').removeClass('hidden');
         },
         complete: function() {
             $('#load_more_loader').addClass('hidden');
         }
     });
 });
 //>
 //Student life (beyond academics)-->
 // type="text/javascript">
 $(document).ready(function() {
     var beyond_table_length = $('#beyond table').length;
     $('#beyond table').each(function(index, data) {
         if (index == 0) {
             if ($(this).find('tr:first-child img').first().length > 0 && $(this).find('tr:first-child img').first().attr('src') != '') {
                 $('#beyond_image').attr('src', $(this).find('tr:first-child img').first().attr('src'));
             }
             var highlight_text = $(this).find('tr:nth-child(2) td').text();
             if (highlight_text.trim() != '') {

                 $('#beyond_highlight').html('<h3>' + highlight_text + '</h3>');
             } else {
                 $('#beyond_highlight').addClass('hidden');
             }
             if ($(this).find('tr:nth-child(3) td').text() != '') {
                 $('#beyond_description').html('<p>' + $(this).find('tr:nth-child(3) td').text() + '</p>');
             }
         } else {
             $('#beyond_table').html(data.innerHTML);
         }
     });
     $('#beyond').remove();
     $('#beyond_container').removeClass('hidden');
     if (beyond_table_length == 1) {
         $('#table_main').addClass('hidden');
     }
 });
 //>
 //prospectus page-->
 // type="text/javascript">
 $('#prospectus_actual table tr').each(function() {
     var prospectus_image = $(this).find('td:first-child img').first().attr('src');
     var prospectus_link = $(this).find('td:nth-child(2) a').first().attr('href');
     var prospectus_desc = $(this).find('td:nth-child(2) a').html();
     var prospectus_append = '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6 resources-list">' +
         '<div class="resources-grid">' +
         '<div class="resource-img">' +
         '<img src="' + prospectus_image + '" class="img-responsive">' +
         '<div class="hover-info">' +
         '<a download target="_blank" href="' + prospectus_link + '">Download</a>' +
         '</div>' +
         '</div>' +
         '<div class="resource-details text-center"><h4>' + prospectus_desc + '</h4></div>' +
         '</div>' +
         '</div>';
     $('#prospectus_main').append(prospectus_append);
 });
 //>
 //academics pages-->
 // type="text/javascript">
 if ($('.academic_description_123').find('img').length > 0) {
     var academics_image = $('.academic_description_123').find('img').first().attr('src');
     $('.academic_description_123').find('img').remove();
     $('.academic_image_123').html('<img src="' + academics_image + '" class="img-responsive">');
 }
 if ($('.academics_message_123').find('img').length > 0) {
     var academics_image = $('.academics_message_123').find('img').first().attr('src');
     $('.academics_message_123').find('img').remove();
     $('img.academics_message_image_123').html('<img src="' + academics_image + '" class="img-responsive">');
 }
 $('body').on('click', '.academic_course', function() {
     var courseid = $(this).attr('id');
     var coursesplit = courseid.split('_');
     var trindex = coursesplit[1];
     $('.courseModal').modal('show');
     $('.course_structure_123 table').find('tr').hide();
     $('.course_structure_123 table').find('tr:nth-child(' + trindex + ')').show();

 });
 $('.carrer_accordian table tr th').append('<i class="fa fa-plus"></i>');
 //>
 //human resources - faculty member-->
 // type="text/javascript">
 $('#home table:nth-child(3)').hide();
 $('#fulltime_tab').on('click', function() {
     $('#home table:nth-child(2)').fadeIn('slow');
     $('#home table:nth-child(3)').hide();
     $(this).parent().addClass('active');
     $(this).parent().next().removeClass('active');
 });
 $('#parttime_tab').on('click', function() {
     $('#home table:nth-child(2)').hide();
     $('#home table:nth-child(3)').fadeIn('slow');
     $(this).parent().addClass('active');
     $(this).parent().prev().removeClass('active');
 });


 $(document).ready(function(e) {
     if ($('#faculty_sub_menu').length > 0) {
         var submenu = $('#faculty_sub_menu').html();
         $('.sub_menu_class').html(submenu);
         $('.sub_menu_class').closest('li').find('a').first().attr('href', 'javascript:void(0);');
         $('.sub_menu_class').closest('li').find('a').first().closest('li').addClass('open');
         $('[data-submenu]').submenupicker();
     }
 });
 //>
 $(document).ready(function() {
     $('#addpassword').hide();
     var errorpassword = false;
     var errorconfirmpassword = false;

     $('#password').focusout(function() {
         password();
     });
     $('#confirmpassword').focusout(function() {
         confirmpassword();
     });



     function password() {

         if ($('#password').val().length <= 8) {
             $('#addpassword').html('at least 8 characters are required');
             $('#addpassword').show();
             errorpassword = true;

         } else {
             $('#addpassword').hide();
         }

     }

     function confirmpassword() {

         // if ($('#confirmpassword').val() === ($('#password').val())) {
         if ($('#confirmpassword').val() != ($('#password').val())) {
             $('#addconfirmpassword').html('Password is not equal');
             $('#addconfirmpassword').show();
             errorconfirmpassword = true;

         } else {
             $('#addconfirmpassword').hide();
         }

     }
     $('#register').submit(function() {
         errorpassword = false;
         errorconfirmpassword = false;
         password();
         confirmpassword();
         if (errorpassword == false && errorconfirmpassword == false) {
             return true;
         } else {
             return false;
         }


     });

 })