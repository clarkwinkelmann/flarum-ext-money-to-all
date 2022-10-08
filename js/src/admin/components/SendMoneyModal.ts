import app from 'flarum/admin/app';
import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import extractText from 'flarum/common/utils/extractText';

export default class SendMoneyModal extends Modal {
    amount: string = ''
    notify: boolean = false
    message: string = ''
    suspended: boolean = false
    lastActivity: string = ''
    previewCount: number | null = null

    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.title');
    }

    oncreate(vnode: any) {
        super.oncreate(vnode);

        this.refresh();
    }

    content() {
        return m('.Modal-body', [
            m('.Form-group', [
                m('label', app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.amount')),
                m('input.FormControl', {
                    type: 'number',
                    value: this.amount,
                    onchange: (event: InputEvent) => {
                        this.amount = (event.target as HTMLInputElement).value;
                    },
                    min: 0,
                    step: 0.1,
                    disabled: this.loading,
                }),
            ]),
            app.forum.attribute('moneyRewardsCreateMoney') ? m('.Form-group', [
                Switch.component({
                    state: this.notify,
                    onchange: (value: boolean) => {
                        this.notify = value;
                    },
                    disabled: this.loading,
                }, app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.notify')),
            ]) : null,
            m('.Form-group', [
                m('label', app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.message')),
                m('textarea.FormControl', {
                    disabled: !this.notify || this.loading,
                    value: this.notify ? this.message : '',
                    onchange: (event: InputEvent) => {
                        this.message = (event.target as HTMLInputElement).value;
                    },
                    placeholder: this.notify ? '' : extractText(app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.messagePlaceholder')),
                }),
                m('.helpText', app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.messageHelp')),
            ]),
            app.forum.attribute('moneyRewardsCreateMoney') ? m('.Form-group', [
                Switch.component({
                    state: this.suspended,
                    onchange: (value: boolean) => {
                        this.suspended = value;
                        this.refresh();
                    },
                    disabled: this.loading,
                }, app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.suspended')),
            ]) : null,
            m('.Form-group', [
                m('label', app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.lastActivity')),
                m('input.FormControl', {
                    type: 'date',
                    value: this.lastActivity,
                    onchange: (event: InputEvent) => {
                        this.lastActivity = (event.target as HTMLInputElement).value;
                        this.refresh();
                    },
                    disabled: this.loading,
                }),
            ]),
            m('.Form-group', [
                m('p', app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.preview', {
                    count: this.previewCount === null ? LoadingIndicator.component({
                        display: 'inline',
                        size: 'small',
                    }) : this.previewCount,
                })),
            ]),
            m('.Form-group', Button.component({
                type: 'submit',
                className: 'Button Button--primary',
                loading: this.loading,
                disabled: parseFloat(this.amount || '0') <= 0,
            }, app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.submit'))),
        ]);
    }

    refresh() {
        this.previewCount = null;

        this.request(true).then(payload => {
            this.previewCount = payload.userMatchCount;
            m.redraw();
        });
    }

    request(dryRun: boolean = false) {
        return app.request<{ userMatchCount: number }>({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/money-to-all',
            errorHandler: this.onerror.bind(this),
            body: {
                suspended: this.suspended,
                lastActivity: this.lastActivity,
                amount: this.amount,
                notify: this.notify,
                message: this.message,
                dryRun,
            },
        });
    }

    onsubmit(event: Event) {
        event.preventDefault();

        this.loading = true;

        this.request().then(payload => {
            this.hide();

            app.alerts.show({type: 'success'}, app.translator.trans('clarkwinkelmann-money-to-all.lib.modal.success', {
                count: payload.userMatchCount,
            }));
        }).catch(() => {
            this.loading = false;
            m.redraw();
        });
    }
}
