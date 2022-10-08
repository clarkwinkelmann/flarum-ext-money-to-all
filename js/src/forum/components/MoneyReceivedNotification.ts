import app from 'flarum/forum/app';
import Notification from 'flarum/forum/components/Notification';

interface MoneyReceivedContent {
    amount: number;
    message: string | null;
}

export default class MoneyReceivedNotification extends Notification {
    icon() {
        return 'fas fa-money-bill';
    }

    href() {
        return app.route.user(app.session.user);
    }

    content() {
        const {amount, message} = this.attrs.notification.content<MoneyReceivedContent>();

        if (message) {
            return message;
        }

        const moneyName = app.forum.attribute<string>('antoinefr-money.moneyname') || '[money]';

        return app.translator.trans('clarkwinkelmann-money-to-all.forum.notification.moneyReceived', {
            amount: moneyName.replace('[money]', amount + ''),
        });
    }

    excerpt() {
        return null;
    }
}
