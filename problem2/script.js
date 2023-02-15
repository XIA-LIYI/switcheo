$(() => {
    let transfer = null;

    const popupContentTemplate = function () {
        return $('<div>').append(
            $(`<p>ETH Address: <span>${transfer.address}</span></p>`),
            $(`<p>Amount: <span>${transfer.amount}</span></p>`),
            $(`<p>OTP: <span>${transfer.otp}</span></p>`)
        );
      };

    const sendTransfer = function() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        }).then(function () {
            if (Math.floor(Math.random() + 0.5) == 0) {
                return false;
            }
            return true;
        });
    };
    
    const loadPanel = $('#loadPanel').dxLoadPanel({
        position: { at: '#form-container'},
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false
    }).dxLoadPanel('instance');

    const popup = $('#popup').dxPopup({
        contentTemplate: null,
        width: 450,
        height: 280,
        container: '.dx-viewport',
        showTitle: true,
        title: 'Please review your transfer details.',
        visible: false,
        showCloseButton: false,
        hideOnOutsideClick: false,
        dragEnabled: false,
        position: {
            my: 'center'
        },
        toolbarItems: [{
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'before',
            options: {
                icon: 'check',
                text: 'Confirm',
                async onClick() {
                    popup.hide();
                    formWidget.readOnly = true;
                    loadPanel.show();
                    let isSuccessful = await sendTransfer();
                    formWidget.readOnly = false;
                    loadPanel.hide();
                    if (isSuccessful) {
                        DevExpress.ui.notify({
                            message: 'Transfer completed!',
                            position: {
                                my: 'center top',
                                at: 'center top',
                            }}, 'success', 3000);
                        formWidget.resetValues();
                    } else {
                        DevExpress.ui.notify({
                            message: 'Transfer Failed!',
                            position: {
                                my: 'center top',
                                at: 'center top',
                            }}, 'error', 3000);
                    }
                    
                }
            }
        }, {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                icon: 'close',
                text: 'Close',
                onClick() {
                    popup.hide();
                }
            }
        }]
    }).dxPopup('instance');

    const onFormSubmit = function (e) {
        let validateResult = formWidget.validate();
        if (!validateResult.isValid) {
            return;
        }
        let result = {}
        $('#form-container').serializeArray().forEach(element => {
            result[element.name] = element.value;
        });
        transfer = result;
        popup.option({
            contentTemplate: () => popupContentTemplate()
        })
        popup.show();
    };

    const formWidget = $('#form-container').dxForm({
        readOnly: false,
        showColonAfterLabel: true,
        showValidationSummary: false,
        items: [{
            itemType: 'group',
            caption: 'Transfer Details',
            items: [{
                dataField: 'address',
                label: {
                    text: 'ETH Address'
                },
                validationRules: [{
                    type: 'required',
                    message: 'Address is required'
                }, {
                    type: 'pattern',
                    pattern: /^0x[a-fA-F0-9]{40}$/,
                    message: 'Please input correct address'
                }]
            }, {
                dataField: 'amount',
                label: {
                    text: 'Amount'
                },
                validationRules: [{
                    type: 'required',
                    message: 'Amount is required'
                }, {
                    type: 'pattern',
                    pattern: /^\d+(\.\d+)?$/,
                    message: 'Please input valid amount'
                }]
            }, {
                dataField: 'otp',
                label: {
                    text: 'OTP Authentication'
                },
                validationRules: [{
                    type: 'required',
                    message: 'OTP is required'
                }, {
                    type: 'pattern',
                    pattern: /^\d{6}$/,
                    message: 'OTP should have 6 digits of numbers'
                }]
            }]
        }, {
            itemType: 'button',
            horizontalAlignment: 'mid',
            buttonOptions: {
                text: 'Submit',
                type: 'success',
                useSubmitBehavior: false,
                onClick: onFormSubmit
            }
        }]
    }).dxForm('instance');
})
