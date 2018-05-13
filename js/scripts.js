(function() {
	'use strict';

	var duration = 200;



	/**
	 * Tooltips Class
	 */
	var Tooltip = function(tooltip) {
		var _self = this;

		var baseClass = 'c-tooltip';

		this.components = {
			trigger: tooltip.nextElementSibling,
			tooltip: tooltip
		};

		this.state = {
			open: false
		};

		var options = {};

		Object.assign(options, tooltip.dataset);

		switch (options.position) {
			case 'top':
				_self.components.tooltip.classList.add(baseClass + '--top');
				break;
			case 'left':
				_self.components.tooltip.classList.add(baseClass + '--left');
				break;
			case 'right':
				_self.components.tooltip.classList.add(baseClass + '--right');
				break;
			default:
				_self.components.tooltip.classList.add(baseClass + '--bottom');
				break;
		}

		this.toggleTooltip = function() {
			if (_self.state.open) {
				_self.closeTooltip();
			}
			else {
				_self.openTooltip();
			}
		};

		this.openTooltip = function() {
			_self.components.tooltip.classList.add('is-open');
			_self.state.open = true;
		};

		this.closeTooltip = function() {
			_self.components.tooltip.classList.remove('is-open');
			_self.components.tooltip.classList.add('is-closing');

			setTimeout(function() {
				_self.components.tooltip.classList.remove('is-closing');
				_self.state.open = false;
			}, duration);
		};

		_self.components.trigger.addEventListener('mouseover', function(event) {
			event.stopPropagation();

			_self.openTooltip();
		});

		_self.components.trigger.addEventListener('mouseout', function(event) {
			event.stopPropagation();

			_self.closeTooltip();
		});
	};

	// Enable all tooltips
	Array.from(document.querySelectorAll('.js-tooltip')).forEach(tooltip => {
		new Tooltip(tooltip);
	});



	/**
	 * Modal Class
	 */

	var Modal = function(modal) {
		var _self = this;

		var classes = {};

		Object.assign(classes, modal.dataset);

		this.components = {
			modal:      modal,
			openModal:  document.querySelectorAll('.' + classes.openModal),
			closeModal: document.querySelectorAll('.' + classes.closeModal),
		};

		this.state = {
			open: false
		};

		this.openModal = function() {
			_self.components.modal.classList.add('is-open');
			_self.state.open = true;
		};

		this.closeModal = function() {
			_self.components.modal.classList.add('is-closing');
			_self.components.modal.classList.remove('is-open');

			setTimeout(function() {
				_self.components.modal.classList.remove('is-closing');
				_self.state.open = false;
			}, duration);
		};

		Array.from(_self.components.openModal).forEach(button => {
			button.addEventListener('click', _self.openModal);
		});

		Array.from(_self.components.closeModal).forEach(button => {
			button.addEventListener('click', _self.closeModal);
		});

		document.addEventListener('keyup', function(event) {
			// Escape key maps to keycode `27`
			if (event.keyCode == 27) {
				if (_self.state.open) {
					_self.closeModal();
				}
			}
		});
	};

	// Enable all modals
	Array.from(document.querySelectorAll('.js-modal')).forEach(modal => {
		new Modal(modal);
	});



	/**
	 * Dropdown Class
	 */

	var Dropdown = function(btn) {
		var _self = this;

		this.components = {
			trigger:  btn,
			dropdown: btn.nextElementSibling
		};

		this.state = {
			open: false
		};

		this.toggleDropdown = function() {
			if (_self.state.open) {
				_self.closeDropdown();
			}
			else {
				_self.openDropdown();
			}
		};

		this.openDropdown = function() {
			_self.components.trigger.classList.add('is-open');
			_self.components.dropdown.classList.add('is-open');
			_self.state.open = true;
		};

		this.closeDropdown = function() {
			_self.components.trigger.classList.remove('is-open');
			_self.components.dropdown.classList.remove('is-open');
			_self.components.dropdown.classList.add('is-closing');

			setTimeout(function() {
				_self.components.dropdown.classList.remove('is-closing');
				_self.state.open = false;
			}, duration);
		};

		_self.components.trigger.addEventListener('click', function(event) {
			event.stopPropagation();

			_self.toggleDropdown();
		});

		document.addEventListener('keyup', function(event) {
			// Escape key maps to keycode `27`
			if (event.keyCode == 27) {
				if (_self.state.open) {
					_self.closeDropdown();
				}
			}
		});
	};

	// Enable all dropdowns
	Array.from(document.querySelectorAll('.js-dropdown')).forEach(button => {
		new Dropdown(button);
	});

}());
