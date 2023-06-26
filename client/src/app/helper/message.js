"use strict";
/**
 * System messages list
 *
 * @author haipt
 */
exports.MSG = {
    /* Common messages */
    COM: {
        /* INFO MSG */
        INF999: "Not customer",
        /*WARNING MSG*/
        WRN001: 'Data not found!',
        WRN002: 'Item <strong>{0}</strong> does not exist!<br>Please check again.',
        WRN003: 'ユーザーはどの部署にも所属していません。ユーザーの情報を確認してください。',
        ERR001: "PDFのページサイズが大きすぎるためこの機能では取り扱えません。",
        ERR002: "システムエラーが発生しました。管理者までお問い合わせください。",
    },
    /* CC001 messages */
    CC00100: {
        ERR001: "メールを入力してください。",
        ERR002: "パスワードを入力してください。",
        ERR003: "有効なメールアドレスを入力してください。",
        ERR004: "電子メールまたはパスワードが無効です。"
    },
    /* CC00201 messages */
    CC00201: {
        INF001: "電子メールが正常に送信されました。 ジャンク/スパムフォルダを確認してください。",
        ERR001: "メールを入力してください。",
        ERR002: "有効なメールアドレスを入力してください。",
        ERR003: "メールをあなたのメールアドレスに送ることができませんでした。 後でもう一度お試しください。",
        ERR004: "入力されたメールアドレスは登録されていません。"
    },
    /* CC00202 messages */
    CC00202: {
        INF001: "あなたのパスワードはリセットされました。",
        ERR001: "新しいパスワードを入力してください。",
        ERR002: "新しいパスワードを入力してください。",
        ERR003: "パスワードの長さは6〜30文字でなければなりません。",
        ERR004: "上記と同じ新しいパスワードを入力してください。",
        ERR005: "パスワードを回復するリンクが存在しなくなりました。",
        ERR006: "ユーザーはSEFURIに存在しません。 再度確認してください。"
    },
    /* CC00300 messages */
    CC00300: {
        INF001: "Your password has been updated!",
        ERR001: "Please provide a password.",
        ERR002: "Please enter a new password.",
        ERR004: "Please enter a confirm new password.",
        ERR003: "Your password must be between {0} and {1} characters long.",
        ERR005: "Please enter the same new password as above.",
        ERR006: "Password provided is incorrect.",
        ERR007: "New password cannot be the same as the old password."
    },
    SF00100: {
        INF001: "Save goal sale successfully",
    },
    /* SF00201 messages */
    SF00201: {
        INF001: "マイボックスに追加しました。",
        INF002: "Template remove from mybox successful",
        ERR001: "Add template to mybox has error",
        ERR002: "Cannot remove template code {0} from mybox",
    },
    /* SF00202 messages */
    SF00202: {
        INF001: "マイボックスに追加しました。"
    },
    SF00205: {
        INF001: "マイボックスに追加しました。"
    },
    SF00204: {
        INF001: "Add product successful",
        ERR000: "SF00202: Error using data",
        ERR001: "この製品が既に存在しています。",
        ERR002: "The final products are completed",
    },
    /*SF00301 deal info*/
    SF00301: {
        INF001: "Template add to mybox successful",
        INF002: "Update deal info successful",
        INF003: "こちらの製品を削除してよろしいですか？",
        INF004: "こちらの見積を削除してよろしいですか？",
        INF005: "OK",
        INF006: "保存されていない項目がありますが、画面を移動してよろしいですか？",
        INF019: "関連する情報（製品や見積情報、画像ファイル）はすべて削除されますがよろしいですか？",
        INF020: "案件削除に成功しました。",
        INF021: "Closed deal info successful",
        INF022: "案件のステータスを「終了」にします。よろしいですか？",
        ERR000: "Error: Data not fail",
        ERR001: "",
        ERR002: "Message: Deal not created",
        ERR003: "Message: Upload file error",
        ERR004: "Min length 0",
        ERR005: "Max length 1000000000000",
        ERR006: "Not upload files",
        ERR007: "Delete deal file error",
        ERR008: "The product is being used, cannot remove!",
        ERR009: "Request attachments",
        ERR010: "Message: Delete quotation error",
        ERR011: "Message: Delete product file error",
        ERR012: "Message: Delete deal file error",
        ERR013: "案件名を入力してください",
        ERR014: "Max-length: 30 character",
        ERR015: "未入力の必須項目があります。確認してください。",
        ERR016: "案件削除に失敗しました。",
        ERR017: "製品名は全角20文字(半角40文字)以内で入力してください。",
        /*file*/
        INF007: "Save deal file successfully",
        INF008: "Are you sure ?",
        INF009: "Remove deal file successfully",
        INF010: "こちらのファイルを削除してよろしいですか？",
        INF011: "Remove quotation successfully",
        INF012: "Remove product successfully",
        INF013: "Remove product file successfully",
        INF014: "Remove deal file successfully",
        INF015: "ファイル形式を確認してください。画像ファイルはJPG、PNG形式のみ対応しています。",
        INF016: "Not Implement",
        INF017: "10MB以下のファイルを選択してください。",
        INF018: "Create Deal Successfully.",
        WRN001: "取引先が登録されていないため設計依頼ができません",
        WRN002: "案件チェックシートに未入力の必須項目があります。",
        WRN003: "文字数オーバーの可能性があります。文字数オーバーすると末尾がカットされます。",
        WRN004: "電脳に保存できる文字数を超えています",
        WRN005: "取引先が登録されていないため受注登録ができません",
    },
    /* SF00303 quotation*/
    SF00303: {
        // confirm cancel
        INF001: "編集中の情報がある場合は保存されませんがよろしいですか？",
        INF002: "Reset data quotation info.",
        INF003: "OK",
        INF004: "Redirect page successfully.",
        // confirm delete
        INF005: 'この見積書を削除しますがよろしいですか？',
        INF007: 'Yes, delete it',
        INF008: 'Delete quotation successfully.',
        INF009: 'Save quotation info successfully.',
        INF0010: 'Error: Quotation has not been created.',
        // message copy and save
        ERR001: 'Error: Input data valid min lot.',
        ERR002: 'Error: Save quotation fail.',
        ERR003: 'Error: Input data not validate.',
        ERR004: 'Error: Date not is validate',
        ERR005: 'Error: Save and copy quotation fail.',
        ERR006: 'Error: Input data not validate.',
    },
    /* SF00302 messages*/
    SF00302: {
        INF001: "Delete product.",
        INF002: "こちらのファイルを削除してよろしいですか？",
        INF014: "この製品を削除してよろしいですか？",
        INF003: "Deleted product successfully.",
        INF004: "OK",
        INF005: "Create product Successfully.",
        INF006: "Update product Successfully.",
        INF007: "Duplicate product Successfully.",
        INF008: "Update data offer successfully.",
        INF009: "Create product file successfully.",
        INF010: "Update product file successfully.",
        INF011: "Deleted product file successfully.",
        INFO12: "戻る/キャンセル",
        INFO13: "保存されていない編集中の情報がありますが、よろしいですか？",
        INF015: "ファイル形式を確認してください。画像ファイルはJPG、PNG形式のみ対応しています。",
        INF016: "10MB以下のファイルを選択してください。",
        INF017: "Nothing changes.",
        INF018: "製品ロット・単価エリアに変更がありません。",
        INF019: "製品概要・仕様エリアに変更がありません。",
        ERR001: "Deleted.",
        ERR002: "The product is being used, cannot remove!",
        ERR003: "Error.",
        ERR004: "Product deal has not been created.",
        ERR005: "Delete product file error.",
        ERR006: "Request attachments.",
        ERR007: "Please enter product name",
        ERR008: "Validate format fileType",
        ERR009: "Data not validate price.",
        ERR010: "板紙・ライナーを選択してください.",
        ERR013: "製品名を入力してください。",
        ERR014: "製品概要・仕様エリアに未保存項目がありますがよろしいでしょうか？",
        ERR015: "製品ロット・単価エリアに未保存項目がありますがよろしいでしょうか？",
        ERR016: "見積もり共通費目エリアに未保存項目がありますがよろしいでしょうか？",
        ERR017: "製品概要・仕様エリアと製品ロット・単価エリアに未保存項目がありますがよろしいでしょうか？",
        ERR018: "製品概要・仕様エリアと見積もり共通費目エリアに未保存項目がありますがよろしいでしょうか？",
        ERR019: "製品ロット・単価エリアと見積もり共通費目エリアに未保存項目がありますがよろしいでしょうか？",
        ERR020: "製品概要・仕様エリアと製品ロット・単価エリアと見積もり共通費目エリアに未保存項目がありますがよろしいでしょうか？"
    },
    /* SF00302 messages*/
    SF00305: {
        INF001: "Delete product.",
        INF002: "Delete product.",
        INF003: "Delete product.",
        ERR001: "Maximum size of attached files is 5MB.",
        ERR002: "No recipients.",
        ERR003: "Loading file error.",
        ERR004: "Total size is bigger than 5MB",
        ERR005: "Email entered is invalid!",
        ERR006: "Number of image is not exceed 6 files!",
        ERR007: "Download file error!",
        ERR008: "しばらくたってから再実行してみてください"
    },
    /* SF00306 messages*/
    SF00306: {
        INF001: "設計依頼を受け付けました。",
        INF002: "Export production specs successfully",
        //input mail adress invalid
        ERR001: "宛先は無効になっています。",
        //input CC invalid
        ERR002: "CCは無効になっています。",
        //input subject invalid
        ERR003: "件名を入力してください。",
        //blank mail adress field
        ERR004: "宛先は入力されていません。",
        //blank content
        ERR005: "本文を入力してください。",
        ERR008: "Request design timeout.",
        ERR009: "The product has been requested",
        ERR010: "システムエラーにより処理が正常に完了できなかった可能性があります。システム管理者に連絡してください。",
        BODY_MAIL_CONTENT: "支援課　担当\nおつかれさまです {0} です。\n以下の製品につき設計内容の確認をお願いします。\nーーーー\n案件ID : {1}\n案件名 : {2}\n得意先ID :" +
            " {3}\n得意先名 : {4} \n{5} \n納期：{6}\n案件詳細情報：\nURL : {7}\n",
        ERR011: "Export production specs error"
    },
    /* SF00307 messages*/
    SF00307: {
        INF001: "",
        INF002: "Export production specs successfully",
        INF003: "受注登録（製造指示）を受け付けました。\n必要に応じて製造仕様書（または商事発注書）を印刷してください。",
        ERR001: "見積書に記載されていない製品が含まれています。受注登録する製品のみを選択するようにしてください。あるいは見積書を修正してください。",
        ERR002: "Call IF error",
        ERR003: "Create order error",
        ERR004: "Export production specs error"
    },
    /* SF00302 messages*/
    SF00308: {
        INF001: "Save data successful.",
        ERR001: "Error: Save data fail.",
    },
    /* SF00309 messages*/
    SF00309: {
        INF001: "サンプル作成依頼は完了しました",
        INF002: "OK",
        WRN001: "編集中の内容を保存せずに画面を移動してもよろしいですか？",
        //input mail adress invalid
        ERR001: "宛先は無効になっています。",
        //input CC invalid
        ERR002: "CCは無効になっています。",
        //input subject invalid
        ERR003: "件名を入力してください。",
        //blank mail adress field
        ERR004: "宛先は入力されていません。",
        //blank content
        ERR005: "本文を入力してください。",
    },
    /* SF00310CtrlImpl messages*/
    SF00310: {
        INF001: "デザイン作成依頼は完了しました",
        INF002: "OK",
        WRN001: "エラー：日付は無効になっています。",
        WRN002: "編集中の内容を保存せずに画面を移動してもよろしいですか？",
        //input mail adress invalid
        ERR001: "宛先は無効になっています。",
        //input CC invalid
        ERR002: "CCは無効になっています。",
        //input subject invalid
        ERR003: "件名を入力してください。",
        //blank mail adress field
        ERR004: "宛先は入力されていません。",
        //blank content
        ERR005: "本文を入力してください。",
    },
    /* SF00501 messages*/
    SF00501: {
        INF001: "Load department lists",
        INF002: "Load data for {0}",
        // TODO: message loading deal by user
        INF003: "Load data user deal",
        WRN001: "表示する実績情報がありません。条件を見直してください"
    },
    /* SF00502 messages*/
    SF00502: {
        INF001: "Load department lists",
        INF002: "Load data for {0}",
        INF003: "",
        INF004: "No change for save",
        INF005: "Save data",
        WRN001: "編集中の内容を保存せずに画面を移動してもよろしいですか？",
        WRN002: "Please select customer",
        WRN003: "Customer has been noted already",
        ERR001: "エラー：日付は無効になっています。" // delivery date invalid
    },
    SF00503: {
        INF001: "Ok",
        INF002: "編集中の内容を保存せずに画面を移動してもよろしいですか？",
        INF003: "本当に削除してよろしいですか？",
        INF004: "Delete customer goal successfully",
        INF005: "Ok",
        INF006: "Person in charge is not selected yet!",
        INF007: "Yes",
        INF008: "Update department goal successfully",
        INF009: "Create department goal successfully",
    },
    /* SFN0307 messages*/
    SFN0307: {
        INF001: "Loading deal data",
        INF002: "受注登録（製造指示）を受け付けました。\n必要に応じて製造仕様書（または商事発注書）を印刷してください。",
        INF003: "Order request",
        INF004: "新しい納入先場所の追加が正常に完了しました。",
        ERR001: "未入力の必須項目があります。確認してください。",
        ERR002: "製品が選択されていません。一つ以上選択してください。",
        ERR003: "Cannot order this deal",
        ERR004: "システムあるいはネットワーク障害の可能性があります。システム管理者に連絡してください。",
        ERR005: "Add new shipping address error"
    },
    /* SFN0401 messages*/
    SFN0401: {
        INF001: "Searching"
    },
    /* SFN0402 messages*/
    SFN0402: {
        INF001: "Loading partner data",
        INF002: "Saving",
        INF003: "メールは正常に送信されました。",
        INF004: "Export PDF successful",
        INF005: "届け先は正常に保存されました。",
        INF006: "ファイル形式を確認してください。画像ファイルはJPG、PNG形式のみ対応しています。",
        INF007: "10MB以下のファイルを選択してください。",
        WRN001: "編集中の内容を保存せずに画面を移動してもよろしいですか？",
        WRN002: "Ok",
        WRN003: "画像を削除します。よろしいですか？",
        ERR001: "Partner not found",
        ERR002: "Send mail fail",
        ERR003: "Export PDF failed",
        ERR004: "届け先が見つかりません。",
        ERR005: "画像のアップロードに失敗しました。"
    },
    /* SFN0504 messages*/
    SFN0504: {
        INF001: "Load department lists",
        INF002: "Load stock statistics",
        WRN001: "There are too much result. Please narrow the filter's scope."
    },
    /* SFN0505 messages*/
    SFN0505: {
        INF001: "Load department lists",
        INF002: "Load shipping statistics",
        WRN001: "There are too much result. Please narrow the filter's scope."
    },
    /* SFN0506 messages*/
    SFN0506: {
        INF001: "Load department lists",
        INF002: "Load payment statistics",
        WRN001: "There are too much result. Please narrow the filter's scope."
    },
    COMPONENT: {
        PRODUCT_INFO_BOX: {
            WRN001: "出荷予定パネルを削除します。よろしいですか？"
        }
    }
};
var Messages = (function () {
    function Messages() {
    }
    Messages.get = function (msgId) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var template = $.validator.format(msgId);
        var msg = template(args);
        return msg;
    };
    return Messages;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Messages;
//# sourceMappingURL=message.js.map