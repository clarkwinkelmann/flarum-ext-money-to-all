import app from 'flarum/forum/app';
import Model from 'flarum/common/Model';
import MoneyReceivedNotification from './components/MoneyReceivedNotification';

app.initializers.add('clarkwinkelmann-money-to-all', () => {
    app.notificationComponents.moneyToAll = MoneyReceivedNotification;

    // Not really used but necessary to prevent warnings in browser console
    // and to make notifications appear at all
    app.store.models.moneyToAll = Model;
});
