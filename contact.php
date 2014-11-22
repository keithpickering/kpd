    <form id="contact" class="contact" method="post" action="/mail.php">
        <h2>
            <span class="alpha">Say hello!</span>
            <span class="contact__subtitle gamma muted">(Or something else)</span>
        </h2>

        <label for="contact-name" class="accessibility">Name</label>
        <input id="contact-name" name="contact-name" type="text" class="text-input contact__name" placeholder="Name">

        <label for="contact-email" class="accessibility">Email</label>
        <input id="contact-email" name="contact-email" type="email" class="text-input contact__email" placeholder="Email">

        <label for="contact-message" class="accessibility">Message</label>
        <textarea id="contact-message" name="contact-message" class="contact__message text-input" placeholder="Enter your message here."></textarea>

        <button type="submit" class="btn btn--large float--right contact__submit">Submit</button>

        <div id="contact-loader" class="spinner contact-loader">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>

        <div id="contact-result" class="contact__result">
            <p></p>

            <a href="#" class="result__close btn btn--large btn--secondary">
                Okay
            </a>
        </div>
    </form>

    <script>
    //
    // Contact form
    //
    $(function() {
        var form = $('#contact'),
        formLoader = $('#contact-loader'),
        formResult = $('#contact-result'),
        formResultText = $('#contact-result > p');
        $(form).submit(function(event) {
            event.preventDefault();
            $(formLoader).show();
            var formData = $(form).serialize();

            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                $(formResult).removeClass('contact__result--error');
                $(formResult).addClass('contact__result--visible contact__result--success');
                $(formResultText).text(response);
                $('#contact-name').val('');
                $('#contact-email').val('');
                $('#contact-message').val('');
            })
            .fail(function(data) {
                $(formResult).removeClass('contact__result--success');
                $(formResult).addClass('contact__result--visible contact__result--error');
                if (data.responseText !== '') {
                    $(formResultText).text(data.responseText);
                } else {
                    $(formResultText).text('Sorry, an error occurred. :(')
                }
            });
        });

        $('.result__close').click(function(e) {
            e.preventDefault();
            $(formLoader).hide();
            $(formResult).removeClass('contact__result--visible');
        });
    });
    </script>
