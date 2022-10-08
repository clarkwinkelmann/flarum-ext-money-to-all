import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import SendMoneyModal from './components/SendMoneyModal';

app.initializers.add('clarkwinkelmann-money-to-all', () => {
    app.extensionData
        .for('clarkwinkelmann-money-to-all')
        .registerSetting(function () {
            return m('.Form-group', Button.component({
                className: 'Button',
                onclick() {
                    app.modal.show(SendMoneyModal);
                },
            }, app.translator.trans('clarkwinkelmann-money-to-all.admin.settings.send')));
        });
});
