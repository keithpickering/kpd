---
layout: post
title: Terms of Service
page-class: page--contract
---


<p class="post__intro">
  Before I begin work on your project, please look through these terms &amp; conditions. I've tried to make them as concise as possible, so don't worry!
</p>

## Scope of The Work

The details of the work I'll be carrying out for you have likely already been established in previous correspondence. However, there are times when the scope of The Work may change---in such an event, renegotiation of rates may be necessary.

## Deadlines

I will do everything in my power to stick to any deadlines we have established. In the event that either party experiences some sort of delay, it's important that we're transparent and honest with each other. Delays are an unavoidable part of life; we just need to handle them in a pragmatic way.

## Copyright & Disclosure

Any third-party materials used for The Work will retain their original licenses. You are responsible for making sure any and all materials you supply to me are correctly licensed.

Once I have been paid in full, all relevant copyright will be assigned to you, unless our previous correspondence has explicitly determined otherwise.

I will be happy to sign a Non-Disclosure Agreement in order to work on your project. Please understand that I may post details about the progress of your project on various social networks, unless I am explicitly asked to refrain from doing so.

## Changes & Maintenance

Any changes that do not drastically alter the scope of The Work will usually not require any additional payment. For those changes that do change the scope of The Work, see the *Scope of The Work* section.

Any errors or bugs discovered within two weeks of the end of The Work will be fixed free of charge.

Maintenance of The Work is not covered by this contract, nor is it included with the cost of the project. If you require maintenance of any kind after the project has been completed, we can discuss this in separate correspondence.

## Payment

If you have chosen to be billed by the hour, an upfront payment of $25 USD will be required before any work can begin.

If you have chosen to be charged a flat fee, an upfront payment of 50% of the total cost of the project will be required before any work can begin. If you have chosen to be charged a flat fee *using a milestone system*, the first milestone will need to be paid in full before any work can begin.

Regardless of the option chosen, I retain all relevant rights to The Work until the entire balance of The Work has been paid in full.

## tl;dr

Let's just be cool to each other! If we both follow that rule, neither of us will have to look at this contract ever again.

<div>
    <form id="terms-form" class="terms" method="post" action="signature-post-mail.php">
        <p>If you agree to the above terms, please enter your full name, then sign below using your mouse, finger, or stylus.</p>

        <label for="terms-name" class="accessibility">Your full name</label>
        <input type="text" name="terms-name" id="terms-name" class="text-input text-input--large" placeholder="Enter your full name here">

        <div class="signature-container">
            <a href="#" id="terms-clear" class="btn btn--secondary btn--small terms__clear">
                Clear
            </a>

            <div id="terms-signature" class="terms__signature"></div>
        </div>

        <div id="terms-loader" class="spinner terms__loader">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>

        <div class="terms__submit">
            <button type="submit" class="btn btn--large">I agree</button>
        </div>

        <div id="terms-result" class="form__result">
            <p></p>

            <a href="#" class="result__close btn btn--large btn--secondary">
                Okay
            </a>
        </div>
    </form>
</div>

<script src="jSignature.min.js"></script>
<script>
    (function($){
        var sigArea = $('#terms-signature');

        $(sigArea).jSignature();

        var form = $('#terms-form'),
            formLoader = $('#terms-loader'),
            formResult = $('#terms-result'),
            formResultText = $('#terms-result > p');

        $(form).submit(function(event) {
            event.preventDefault();

            $(formLoader).show();

            var dataPair = $(sigArea).jSignature('getData', 'base30');
            var formData = $(form).serialize() + '&terms-signature=' + dataPair[1];

            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                $(formLoader).hide();
                $(formResult).removeClass('form__result--error');
                $(formResult).addClass('form__result--visible form__result--success');

                $(sigArea).jSignature('reset');
                $('#terms-name').val('');
                $(formResultText).text(response);
            })
            .fail(function(data) {
                $(formLoader).hide();
                $(formResult).removeClass('form__result--success');
                $(formResult).addClass('form__result--visible form__result--error');

                if (data.responseText !== '') {
                    $(formResultText).text(data.responseText);
                } else {
                    $(formResultText).text('Sorry, an error occurred :(');
                }
            });
        });

        $('.result__close').click(function(e) {
            e.preventDefault();
            $(formLoader).hide();
            $(formResult).removeClass('form__result--visible');
        });

        $(function() {
            $('#terms-clear').hide();

            $(sigArea).bind('change', function(e) {
                $('#terms-clear').show();
            });

            $('#terms-clear').click(function(e) {
                e.preventDefault();
                $(sigArea).jSignature('reset');
                $(this).blur().hide();
            })
        });
    })(jQuery);
</script>
