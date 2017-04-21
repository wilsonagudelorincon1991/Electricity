(function () {
    var $ = window.jQuery;

    // Default options
    MaterializeClock.DEFAULTS = {
        startTime: '', // default time, '' or 'now' or 'H:MM AM'
        autoclose: false, // show Cancel/OK buttons
        vibrate: true, // vibrate the device when dragging clock hand
        setTime: function (time) {     
            console.log(time);
        }, // Metodo para establecer fecha Seleccionada
        time : undefined
    };

    // Listen touch events in touch screen device, instead of mouse events in desktop.
    var touchSupported = 'ontouchstart' in window;
    var mousedownEvent = 'mousedown' + (touchSupported ? ' touchstart' : '');
    var mousemoveEvent = 'mousemove.materialize-clock' + (touchSupported ? ' touchmove.materialize-clock' : '');
    var mouseupEvent = 'mouseup.materialize-clock' + (touchSupported ? ' touchend.materialize-clock' : '');

    // Vibrate the device if supported
    var vibrate = navigator.vibravarte ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

    var svgNS = 'http://www.w3.org/2000/svg';

    function createSvgElement(name) {
        return document.createElementNS(svgNS, name);
    }

    function leadingZero(num) {
        return (num < 10 ? '0' : '') + num;
    }

    // Get a unique id
    var idCounter = 0;

    function uniqueId(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    }

    // Clock size
    var dialRadius = 84;
    var radius = 70;
    var tickRadius = 12;
    var diameter = dialRadius * 2;
    var duration = 350;

    // Popover template
    var tpl = [
        '<div class="materialize-clock-frame">',
        '<div class="materialize-clock-popover">',
        '<div class="materialize-clock-header">',
        '<div class="materialize-clock-time">',
        '<div class="materialize-clock-hours materialize-clock-primary-text">',
        '<div class="materialize-clock-time-old"></div>',
        '<div class="materialize-clock-time-new"></div>',
        '</div>',
        '<span class="materialize-clock-colon">:</span>',
        '<div class="materialize-clock-minutes">',
        '<div class="materialize-clock-time-old"></div>',
        '<div class="materialize-clock-time-new"></div>',
        '</div>',
        '</div>',
        '<span class="materialize-clock-am-pm"></span>',
        '</div>',
        '<div>',
        '<div class="popover-content">',
        '<div class="materialize-clock-plate">',
        '<div class="materialize-clock-canvas"></div>',
        '<div class="materialize-clock-dial materialize-clock-dial-hours"></div>',
        '<div class="materialize-clock-dial materialize-clock-dial-minutes materialize-clock-dial-out"></div>',
        '</div>',
        '<div class="materialize-clock-ampm-block">',
        '<div id="materialize-clock-btn-am" class="materialize-clock-ampm-btn">',
        '<div class="materialize-clock-btn-background"></div>',
        '<div class="materialize-clock-btn-text">AM</div>',
        '</div>',
        '<div id="materialize-clock-btn-pm" class="materialize-clock-ampm-btn">',
        '<div class="materialize-clock-btn-background"></div>',
        '<div class="materialize-clock-btn-text">PM</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ].join('');

    // LolliClock
    function MaterializeClock(element, options) {
        var frame = $(tpl);
        var popover = frame.find('.materialize-clock-popover');
        var plate = popover.find('.materialize-clock-plate');
        var hoursView = popover.find('.materialize-clock-dial-hours');
        var minutesView = popover.find('.materialize-clock-dial-minutes');
        var isInput = element.prop('tagName') === 'INPUT';
        var input = isInput ? element : element.find('input');
        var self = this;

        this.id = uniqueId('lolli');
        this.element = element;
        this.options = options;
        this.isAppended = false;
        this.isShown = false;
        this.currentView = 'hours';
        this.isInput = isInput;
        this.input = input;
        this.frame = frame;
        this.popover = popover;
        this.plate = plate;
        this.hoursView = hoursView;
        this.minutesView = minutesView;
        this.header = popover.find('.materialize-clock-header');
        this.spanHours = popover.find('.materialize-clock-hours');
        this.spanMinutes = popover.find('.materialize-clock-minutes');
        this.spanNewTime = popover.find('.materialize-clock-time-new');
        this.spanOldTime = popover.find('.materialize-clock-time-old');
        this.spanAmPm = popover.find('.materialize-clock-am-pm');
        this.amOrPm = "PM";
        this.AmPmButtons = popover.find('.materialize-clock-ampm-btn');
        this.amButton = popover.find('#materialize-clock-btn-am');
        this.pmButton = popover.find('#materialize-clock-btn-pm');

        if (this.options.time) {
            var $newtime = leadingZero(this.options.time.getHours());
            $newtime += ':' + leadingZero(this.options.time.getMinutes());
            $newtime += this.options.time.getHours() > 12 ? ' PM' : ' AM';
            
            this.options.startTime = $newtime; this.input.prop('value', $newtime);
        } // Se ha establecido tiempo de inicio

        //var exportName = (this.input[0].name || this.input[0].id) + '-export';
        //this.dateTimeVal = $('<input type="hidden" id="' + exportName + '"></input>').insertAfter(input);
        // If autoclose is not setted, append a button
        if (!options.autoclose) {
            this.popover.css('height', '380px');
            var $closeButtons = $('<div class="materialize-clock-buttons"></div>').appendTo(popover);
            $('<div class="materialize-clock-button">Cancelar</div>')
                    .click($.proxy(this.hide, this))
                    .appendTo($closeButtons);
            $('<div class="materialize-clock-button">Establecer</div>')
                    .click($.proxy(this.done, this))
                    .appendTo($closeButtons);
            this.closeButtons = popover.find('.materialize-clock-button');
        }

        // Show or toggle
        input.on('focus.materialize-clock click.materialize-clock', $.proxy(this.show, this));

        // Build ticks
        var tickTpl = $('<div class="materialize-clock-tick"></div>');
        var i, tick, radian;

        // Hours view
        for (i = 1; i < 13; i++) {
            tick = tickTpl.clone();
            radian = i / 6 * Math.PI;
            tick.css({
                left: dialRadius + Math.sin(radian) * radius - tickRadius,
                top: dialRadius - Math.cos(radian) * radius - tickRadius
            });
            tick.html(i);
            hoursView.append(tick);
        }

        // Minutes view
        for (i = 0; i < 60; i += 5) {
            tick = tickTpl.clone();
            radian = i / 30 * Math.PI;
            tick.css({
                left: dialRadius + Math.sin(radian) * radius - tickRadius,
                top: dialRadius - Math.cos(radian) * radius - tickRadius
            });
            tick.html(leadingZero(i));
            minutesView.append(tick);
        }

        //Move click to nearest tick
        plate.on(mousedownEvent, mousedown);

        // Mousedown or touchstart
        function mousedown(e) {
            var offset = plate.offset(),
                    isTouch = /^touch/.test(e.type),
                    x0 = offset.left + dialRadius,
                    y0 = offset.top + dialRadius,
                    dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                    dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
                    z = Math.sqrt(dx * dx + dy * dy),
                    moved = false;

            // Ignore plate clicks that aren't even close
            if (z < radius - tickRadius || z > radius + tickRadius) {
                return;
            }
            e.preventDefault();
            $(document.body).addClass('materialize-clock-moving');

            // Place the canvas to top
            plate.append(self.canvas);

            // Clock
            self.setHand(dx, dy);

            // Mousemove on document
            $(document).off(mousemoveEvent).on(mousemoveEvent, function (e) {
                e.preventDefault();
                var isTouch = /^touch/.test(e.type),
                        x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
                        y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
                if (!moved && x === dx && y === dy) {
                    // Clicking in chrome on windows will trigger a mousemove event
                    return;
                }
                moved = true;
                self.setHand(x, y);
            });

            // Mouseup on document
            $(document).off(mouseupEvent).on(mouseupEvent, function (e) {
                e.preventDefault();
                var isTouch = /^touch/.test(e.type),
                        x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
                        y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
                if (x === dx && y === dy) {
                    self.setHand(x, y);
                }
                if (self.currentView === 'hours') {
                    self.toggleView('minutes', duration / 2);
                } else if (options.autoclose) {
                    self.done();
                }
                plate.prepend(canvas);

                // Reset mouse cursor
                $(document.body).removeClass('materialize-clock-moving');

                // Unbind mousemove event
                $(document).off(mousemoveEvent);
                $(document).off(mouseupEvent);
            });
        }

        // Draw clock SVG
        var canvas = popover.find('.materialize-clock-canvas');
        var svg = createSvgElement('svg');
        svg.setAttribute('class', 'materialize-clock-svg');
        svg.setAttribute('width', diameter);
        svg.setAttribute('height', diameter);
        var g = createSvgElement('g');
        g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
        var bearing = createSvgElement('circle');
        bearing.setAttribute('class', 'materialize-clock-bearing');
        bearing.setAttribute('cx', 0);
        bearing.setAttribute('cy', 0);
        bearing.setAttribute('r', 1.25);
        var hand = createSvgElement('line');
        hand.setAttribute('x1', 0);
        hand.setAttribute('y1', 0);
        var bg = createSvgElement('circle');
        bg.setAttribute('class', 'materialize-clock-canvas-bg');
        bg.setAttribute('r', tickRadius);
        var fg = createSvgElement('circle');
        fg.setAttribute('class', 'materialize-clock-canvas-fg');
        fg.setAttribute('r', 3.5);
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(fg);
        g.appendChild(bearing);
        svg.appendChild(g);
        canvas.append(svg);

        this.hand = hand;
        this.bg = bg;
        this.fg = fg;
        this.bearing = bearing;
        this.g = g;
        this.canvas = canvas;

        raiseCallback(this.options.init);
    }

    function raiseCallback(callbackFunction) {
        if (callbackFunction && typeof callbackFunction === "function") {
            callbackFunction();
        }
    }

    // Show or hide popover
    MaterializeClock.prototype.toggle = function () {
        this[this.isShown ? 'hide' : 'show']();
    };

    MaterializeClock.prototype.changeAmPm = function (isAmOrPm) {
        if (!!isAmOrPm && isAmOrPm === this.amOrPm)
            return;
        this.amOrPm = this.amOrPm === 'AM' ? 'PM' : 'AM';
        this.spanAmPm.html(this.amOrPm);
        $(this.amButton[0].childNodes[0]).toggleClass('materialize-clock-active-button-background', (this.amOrPm === 'AM'));
        $(this.pmButton[0].childNodes[0]).toggleClass('materialize-clock-active-button-background', (this.amOrPm === 'PM'));
        $(this.amButton[0].childNodes[1]).toggleClass('materialize-clock-active-button-text', (this.amOrPm === 'AM'));
        $(this.pmButton[0].childNodes[1]).toggleClass('materialize-clock-active-button-text', (this.amOrPm === 'PM'));
    };

    // Set popover position, keep it on screen no matter how it's scrolled
    MaterializeClock.prototype.locate = function () {
        var element = this.element; var popover = this.popover; popover.show();
    };

    // Show popover
    MaterializeClock.prototype.show = function () {
        //this.input.trigger('blur');
        if (this.isShown) { return; }

        raiseCallback(this.options.beforeShow);
        var self = this;

        // Initialize
        if (!this.isAppended) {
            // Append popover to body
            $(document.body).append(this.frame);
            this.isAppended = true;

            // Reset position when resize
            $(window).on('resize.materialize-clock' + this.id, function () {
                if (self.isShown) {
                    self.popover.show();
                }
            });

            // Reset position on scroll
            $(window).on('scroll.materialize-clock', function () {
                if (self.isShown) {
                    self.popover.show();
                }
            });

            //Add listeners
            this.AmPmButtons.on('click', function (e) {
                self.changeAmPm(e.currentTarget.children[1].innerHTML);
            });
            this.spanMinutes.on('click', function () {
                self.toggleView('minutes');
            });
            this.spanHours.on('click', function () {
                self.toggleView('hours');
            });
            this.spanAmPm.on('click', function () {
                self.changeAmPm();
            });
        }

        // Set position
        this.popover.show();

        //animate show
        this.frame.removeClass('hidden');
        this.plate.addClass('animate');
        this.header.addClass('animate');
        this.popover.addClass('animate');
        this.AmPmButtons.addClass('animate');
        this.spanNewTime.addClass('animate');
        this.spanOldTime.addClass('animate');
        !this.options.autoclose && this.closeButtons.addClass('animate');

        this.plate.on('webkitAnimationEnd animationend MSAnimationEnd oanimationend',
                function () {
                    self.plate.removeClass("animate");
                    self.header.removeClass("animate");
                    self.popover.removeClass("animate");
                    self.AmPmButtons.removeClass("animate");
                    self.spanNewTime.removeClass("animate");
                    self.spanOldTime.removeClass("animate");
                    !self.options.autoclose && self.closeButtons.removeClass("animate");
                    self.plate.off('webkitAnimationEnd animationend MSAnimationEnd oanimationend');
                }
        );

        //Get the time
        function timeToDate(time) {
            var parts = time.split(':');
            if (parts.length === 2) {
                var hours = +parts[0];
                var minAM = parts[1].split(' ');
                if (minAM.length === 2) {
                    var mins = minAM[0];
                    if (minAM[1] === 'PM')
                        hours += 12;
                    return new Date(1970, 1, 1, hours, mins);
                }
            }
            return new Date('x');
        }

        function isValidTime(time) {
            return !isNaN(timeToDate(time).getTime());
        }

        var value;
        var inputValue = this.input.prop('value');
        var defaultValue = this.options.startTime;
        var placeholderValue = this.input.prop('placeholder');

        if (inputValue && isValidTime(inputValue)) {
            value = timeToDate(inputValue);
        } else if (defaultValue === 'now') {
            value = new Date();
        } else if (defaultValue && isValidTime(defaultValue)) {
            value = timeToDate(defaultValue);
        } else if (placeholderValue && isValidTime(placeholderValue)) {
            value = timeToDate(placeholderValue);
        } else {
            value = new Date();
        }
        this.hours = value.getHours() % 12;
        this.minutes = value.getMinutes();
        //purposefully wrong because we change it next line
        this.amOrPm = value.getHours() > 11 ? "AM" : "PM";
        this.changeAmPm();

        // Set time
        self.toggleView('minutes'); self.toggleView('hours');
        self.isShown = true;

        // Hide when clicking or tabbing on any element except the clock, input
        $(document).on('click.materialize-clock.' + this.id + ' focusin.materialize-clock.' + this.id, function (e) {
            var target = $(e.target);
            if (target.closest(self.popover).length === 0 &&
                    target.closest(self.input).length === 0) {
                self.done();
            }
        });

        // Hide when ESC is pressed
        $(document).on('keyup.materialize-clock.' + this.id, function (e) {
            if (e.keyCode === 27) {
                self.hide();
            }
        });
        raiseCallback(this.options.afterShow);
    };

    // Hide popover
    MaterializeClock.prototype.hide = function () {
        raiseCallback(this.options.beforeHide);

        //animate out
        var self = this;
        self.popover.addClass('animate-out');
        self.plate.addClass("animate-out");
        self.header.addClass("animate-out");
        self.AmPmButtons.addClass("animate-out");
        !self.options.autoclose && self.closeButtons.addClass('animate-out');

        this.popover.on('webkitAnimationEnd animationend MSAnimationEnd oanimationend',
                function () {
                    self.frame.addClass('hidden');
                    $(self.spanHours[0].childNodes[0]).html('');
                    $(self.spanMinutes[0].childNodes[0]).html('');
                    self.popover.removeClass("animate-out");
                    self.plate.removeClass("animate-out");
                    self.header.removeClass("animate-out");
                    self.AmPmButtons.removeClass("animate-out");
                    !self.options.autoclose && self.closeButtons.removeClass("animate-out");
                    self.popover.off('webkitAnimationEnd animationend MSAnimationEnd oanimationend');

                    // Unbinding events on document
                    $(document).off('click.materialize-clock.' + self.id + ' focusin.materialize-clock.' + self.id);
                    $(document).off('keyup.materialize-clock.' + self.id);

                    self.popover.hide();
                    raiseCallback(self.options.afterHide);
                }
        );

        self.isShown = false;
    };

    // Toggle to hours or minutes view
    MaterializeClock.prototype.toggleView = function (view, delay) {
        var isHours = view === 'hours';
        var nextView = isHours ? this.hoursView : this.minutesView;
        var hideView = isHours ? this.minutesView : this.hoursView;

        this.currentView = view;

        this.spanHours.toggleClass('materialize-clock-primary-text', isHours);
        this.spanMinutes.toggleClass('materialize-clock-primary-text', !isHours);

        // Let's make transitions
        hideView.addClass('materialize-clock-dial-out');
        nextView.css('visibility', 'visible').removeClass('materialize-clock-dial-out');

        // Reset clock hand
        this.resetClock(delay);

        // After transitions ended
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function () {
            hideView.css('visibility', 'hidden');
        }, duration);

        //Add pointer mouse cursor to show you can click between ticks
        if (isHours) {
            this.plate.off(mousemoveEvent);
        } else {
            var self = this;
            this.plate.on(mousemoveEvent, function (e) {

                var offset = self.plate.offset(),
                        x0 = offset.left + dialRadius,
                        y0 = offset.top + dialRadius,
                        dx = e.pageX - x0,
                        dy = e.pageY - y0,
                        z = Math.sqrt(dx * dx + dy * dy);
                if (z > radius - tickRadius && z < radius + tickRadius) {
                    $(document.body).addClass('materialize-clock-clickable');
                } else {
                    $(document.body).removeClass('materialize-clock-clickable');
                }
            });
        }
    };

    // Reset clock hand
    MaterializeClock.prototype.resetClock = function (delay) {
        var view = this.currentView,
                value = this[view],
                isHours = view === 'hours',
                unit = Math.PI / (isHours ? 6 : 30),
                radian = value * unit,
                x = Math.sin(radian) * radius,
                y = -Math.cos(radian) * radius,
                self = this;
        if (delay) {
            self.canvas.addClass('materialize-clock-canvas-out');
            setTimeout(function () {
                self.canvas.removeClass('materialize-clock-canvas-out');
                self.setHand(x, y);
            }, delay);
        } else {
            this.setHand(x, y);
        }
    };

    // Set clock hand to (x, y)
    MaterializeClock.prototype.setHand = function (x, y) {
        //Keep radians postive from 1 to 2pi
        var radian = Math.atan2(-x, y) + Math.PI;
        var isHours = this.currentView === 'hours';
        var unit = Math.PI / (isHours ? 6 : 30);
        var value;

        // Get the round value
        value = Math.round(radian / unit);
        // Get the round radian
        radian = value * unit;

        // Correct the hours or minutes
        if (isHours) {
            if (value === 0) {
                value = 12;
            }
            this.fg.style.visibility = 'hidden';
        } else {
            var isOnNum = (value % 5 === 0);
            if (isOnNum) {
                this.fg.style.visibility = 'hidden';
            } else {
                this.fg.style.visibility = 'visible';
            }
            if (value === 60) {
                value = 0;
            }
        }

        // Once hours or minutes changed, vibrate the device
        if (this[this.currentView] !== value) {
            if (vibrate && this.options.vibrate) {
                // Do not vibrate too frequently
                if (!this.vibrateTimer) {
                    navigator[vibrate](10);
                    this.vibrateTimer = setTimeout($.proxy(function () {
                        this.vibrateTimer = null;
                    }, this), 100);
                }
            }
        }
        //TODO: Keep tens digit static for changing hours
        this[this.currentView] = value;
        function cleanupAnimation($obj) {
            $obj.on('webkitAnimationEnd animationend MSAnimationEnd oanimationend',
                    function () {
                        $oldTime.html(value); //only needed for -up transitions
                        $oldTime.removeClass("old-down old-up");
                        $newTime.removeClass("new-down new-up");
                        $oldTime.off('webkitAnimationEnd animationend MSAnimationEnd oanimationend');
                    });
        }

        var $oldTime;
        var $newTime;
        if (isHours) {
            $oldTime = $(this.spanHours[0].childNodes[0]);
            $newTime = $(this.spanHours[0].childNodes[1]);
        } else {
            $oldTime = $(this.spanMinutes[0].childNodes[0]);
            $newTime = $(this.spanMinutes[0].childNodes[1]);
            value = leadingZero(value);
        }
        cleanupAnimation($oldTime);
        if (value < (+$oldTime.html())) {
            $newTime.html($oldTime.html());
            $oldTime.html(value);
            $newTime.addClass('new-down');
            $oldTime.addClass('old-down');
        } else if (value > (+$oldTime.html()) || !$oldTime.html()) {
            $newTime.html(value);
            $oldTime.addClass('old-up');
            $newTime.addClass('new-up');
        }

        this.g.insertBefore(this.hand, this.bearing);
        this.g.insertBefore(this.bg, this.fg);
        this.bg.setAttribute('class', 'materialize-clock-canvas-bg');

        // Set clock hand and others' position
        var cx = Math.sin(radian) * radius,
                cy = -Math.cos(radian) * radius;
        this.hand.setAttribute('x2', Math.sin(radian) * (radius - tickRadius));
        this.hand.setAttribute('y2', -Math.cos(radian) * (radius - tickRadius));
        this.bg.setAttribute('cx', cx);
        this.bg.setAttribute('cy', cy);
        this.fg.setAttribute('cx', cx);
        this.fg.setAttribute('cy', cy);
    };

    // Hours and minutes are selected
    MaterializeClock.prototype.done = function () {
        raiseCallback(this.options.beforeDone); var _hour;
        
        _hour = (this.amOrPm === 'PM') ?
            (this.hours === 12) ? this.hours : this.hours + 12 :
            (this.hours === 12) ? 0 : this.hours;

        var last = this.input.prop('value');
        var value = leadingZero(this.hours) + ':' + leadingZero(this.minutes) + " " + this.amOrPm;
        if (value !== last) {
            this.input.prop('value', value);
            this.input.trigger('input');
            this.input.trigger('change');
        }
        this.options.setTime(new Date(1990, 0, 1, _hour, this.minutes, 0)); this.hide();
    };
    
    MaterializeClock.prototype.now = function () {
        var $timeNow = new Date(); var _hour = $timeNow.getHours();
        
        this.hours = (_hour > 12) ? _hour - 12 : _hour;
        this.amOrPm = (_hour > 11) ? "PM" : "AM"; this.minutes = $timeNow.getMinutes();
        var value = leadingZero(this.hours) + ':' + leadingZero(this.minutes)  + " " + this.amOrPm;
        this.input.prop('value', value); this.options.setTime($timeNow);
    };

    // Remove materialize-clock from input
    MaterializeClock.prototype.remove = function () {
        this.element.removeData('materialize-clock');
        this.input.off('focus.materialize-clock click.materialize-clock');
        if (this.isShown) {
            this.hide();
        }
        if (this.isAppended) {
            $(window).off('resize.materialize-clock' + this.id);
            $(window).off('scroll.materialize-clock' + this.id);
            this.popover.remove();
        }
    };

    // Extends $.fn.materialize-clock
    $.fn.clocks = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.each(function () {
            var $this = $(this),
                    data = $this.data('materialize-clock');
            if (!data) {
                var options = $.extend({}, MaterializeClock.DEFAULTS, $this.data(), typeof option === 'object' && option);
                var $materializeClock = new MaterializeClock($this, options);
                console.log($materializeClock);
                $this.data('materialize-clock', $materializeClock); 
                return $materializeClock;
            } else {
                // Manual operatsions. show, hide, remove, e.g.
                if (typeof data[option] === 'function') {
                    data[option].apply(data, args);
                }
            }
        });
    };
    
    $.fn.clock = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var $this = $(this), data = $this.data('materialize-clock');

        if (!data) {
            var options = $.extend({}, MaterializeClock.DEFAULTS, $this.data(), typeof option === 'object' && option);
            var $materializeClock = new MaterializeClock($this, options);
            $this.data('materialize-clock', $materializeClock); return $materializeClock;
        } 

        else {
            if (typeof data[option] === 'function') data[option].apply(data, args);
        }
    };
}());