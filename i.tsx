import React, { useState, useEffect } from 'react';

// 全80問のデータ
const allQuestions = [
  // --- 既存の50問 ---
  { category: "情報とメディア", question: "情報の伝達や通信の仲立ちとして使われるメディア（例：電話回線、インターネット）を何というか。", options: ["表現メディア", "伝達メディア", "記録メディア", "通信メディア"], answer: 1, explanation: "伝達メディアは情報を離れた場所に伝える経路を指します。" },
  { category: "情報とメディア", question: "情報の記録や蓄積に使われるメディアの例として、適切なものはどれか。", options: ["書籍", "手帳", "画像", "ジェスチャー"], answer: 1, explanation: "記録メディアは情報を保存しておく媒体（手帳、メモリなど）です。" },
  { category: "情報とメディア", question: "情報の特性に関する記述のうち、誤っているものはどれか。", options: ["残存性がある", "伝播性がある", "情報にははっきりとした形がある", "複製性がある"], answer: 2, explanation: "情報には形がありません（無形性）。" },
  { category: "情報とメディア", question: "得られた情報が自分にとって価値があるかどうかは、受け手によって異なる。この特性を何というか。", options: ["残存性", "伝播性", "個別性", "複製性"], answer: 2, explanation: "価値の感じ方は受け手によって異なるのが個別性です。" },
  { category: "情報とメディア", question: "情報の信憑性を確かめる方法として、適切でないものはどれか。", options: ["クロスチェック", "発信日の確認", "発信元の確認", "自分の意見との一致を確認"], answer: 3, explanation: "自分の意見と合うかどうかで判断するのは確証バイアスです。" },
  { category: "情報とメディア", question: "情報を読み解き、利用する力を何というか。", options: ["メディアリテラシー", "情報デザイン", "デジタルディバイド", "情報モラル"], answer: 0, explanation: "メディアリテラシーは情報を活用する総合的な能力です。" },
  { category: "問題解決と発想法", question: "問題解決の5つのプロセスの順番として正しいものはどれか。", options: ["発見→定義→計画→実行→振り返り", "定義→発見→実行→計画→振り返り", "発見→計画→定義→実行→振り返り", "定義→発見→計画→実行→振り返り"], answer: 0, explanation: "発見→定義→計画→実行→振り返りが標準的な流れです。" },
  { category: "問題解決と発想法", question: "問題解決のプロセスにおいて、最も重要なことは何か。", options: ["解決策を1つに絞る", "現実と理想の差を把握する", "他者の評価", "技術の活用"], answer: 1, explanation: "問題＝理想と現状の差、です。" },
  { category: "問題解決と発想法", question: "ブレーンストーミングのルールとして、誤っているものはどれか。", options: ["他人の意見を批判する", "自由奔放", "質より量", "便乗歓迎"], answer: 0, explanation: "批判は厳禁です。" },
  { category: "問題解決と発想法", question: "KJ法について、誤っているものはどれか。", options: ["1枚1概念", "無理にグルーピングしない", "最初に名前をつける", "柔らかい言葉で書く"], answer: 2, explanation: "名前（表札）は後からつけます。" },
  { category: "問題解決と発想法", question: "中心から放射状に枝分かれさせて描く発想法を何というか。", options: ["ブレスト", "KJ法", "マインドマップ", "クロスチェック"], answer: 2, explanation: "マインドマップは放射状の思考ツールです。" },
  { category: "情報モラルと技術", question: "偽サイトで情報を盗む手法を何というか。", options: ["ソーシャルエンジニアリング", "フィッシング", "スパム", "ランサムウェア"], answer: 1, explanation: "フィッシング詐欺です。" },
  { category: "情報モラルと技術", question: "心理的な隙やミスを利用して情報を得る手法を何というか。", options: ["ソーシャルエンジニアリング", "フィッシング", "ハッキング", "クラッキング"], answer: 0, explanation: "人間関係の隙を突くのがソーシャルエンジニアリングです。" },
  { category: "情報モラルと技術", question: "写真のGPS情報を何というか。", options: ["Exif (ジオタグ)", "Cookie", "IPアドレス", "キャッシュ"], answer: 0, explanation: "Exifデータ内のジオタグで場所が特定されます。" },
  { category: "情報モラルと技術", question: "商品ロゴなどを保護する権利は？", options: ["著作権", "商標権", "特許権", "意匠権"], answer: 1, explanation: "ロゴやブランドは商標権です。" },
  { category: "情報モラルと技術", question: "他人の著作物を一定のルールで使うことを何というか。", options: ["複製", "引用", "転載", "盗作"], answer: 1, explanation: "引用のルールを守れば許可は不要です。" },
  { category: "情報モラルと技術", question: "自由に使っていいと意思表示する仕組みを何というか。", options: ["クリエイティブ・コモンズ", "フリーウェア", "パブリックドメイン", "シェアウェア"], answer: 0, explanation: "CCライセンスのことです。" },
  { category: "情報モラルと技術", question: "著作権が発生するのは？", options: ["思案時", "創作時", "公開時", "登録時"], answer: 1, explanation: "創作した時点で自動発生します。" },
  { category: "情報モラルと技術", question: "著作権法の保護対象はどれ？", options: ["ペンのデザイン提案", "新しい発明", "ロゴマーク", "ダンスの振り付け"], answer: 3, explanation: "ダンスは著作物です。" },
  { category: "情報モラルと技術", question: "SNS利用で正しいのは？", options: ["誹謗中傷に最適", "削除すれば消える", "匿名なら安全", "プライバシー公開に注意"], answer: 3, explanation: "ネット上の情報の完全消去は困難です。" },
  { category: "情報モラルと技術", question: "SNSで見知らぬ人からDMが来た際の対応は？", options: ["返信", "間違いと指摘", "やり取り", "無視"], answer: 3, explanation: "無視するのが鉄則です。" },
  { category: "情報モラルと技術", question: "電子マネーのチップを何というか。", options: ["ARチップ", "VRチップ", "ICチップ", "IDチップ"], answer: 2, explanation: "ICチップが情報を処理します。" },
  { category: "情報モラルと技術", question: "現実錯覚体験技術を何というか。", options: ["AR", "VR", "AI", "IoT"], answer: 1, explanation: "VRは仮想現実です。" },
  { category: "情報モラルと技術", question: "長時間の画面凝視による障害を何というか。", options: ["テクノストレス", "VDT障害", "デジタルディバイド", "エコーチェンバー"], answer: 1, explanation: "VDT作業による心身への影響です。" },
  { category: "情報モラルと技術", question: "情報格差を何というか。", options: ["デジタルタトゥー", "テクノストレス", "デジタルディバイド", "インフォデミック"], answer: 2, explanation: "情報環境による格差です。" },
  { category: "ネット通信とデジタル", question: "ネットの特性で誤りは？", options: ["グループ通信容易", "売買は必ず実名", "記録が残る", "個人発信可能"], answer: 1, explanation: "匿名取引も一般的です。" },
  { category: "ネット通信とデジタル", question: "実名発信の特徴は？", options: ["自由な発言", "告発しやすい", "責任を持つ", "不確かな情報が広がる"], answer: 2, explanation: "責任を伴うのが実名です。" },
  { category: "ネット通信とデジタル", question: "文字に割り当てられた数値パターンを何というか。", options: ["フォント", "文字コード", "ピクセル", "フレーム"], answer: 1, explanation: "文字コードが文字を数値化します。" },
  { category: "ネット通信とデジタル", question: "画像の画素の細かさを何というか。", options: ["解像度", "階調", "圧縮率", "フレームレート"], answer: 0, explanation: "解像度が高いほど繊細です。" },
  { category: "ネット通信とデジタル", question: "動画の1枚の静止画を何というか。", options: ["画素", "ピクセル", "フレーム", "トラック"], answer: 2, explanation: "フレームの連続が動画です。" },
  { category: "ネット通信とデジタル", question: "点の集まりで表現する画像形式は？", options: ["ベクター", "ラスター", "アナログ", "テキスト"], answer: 1, explanation: "ラスターデータ（ビットマップ）のことです。" },
  { category: "ネット通信とデジタル", question: "ネットを通じた資金提供の仕組みは？", options: ["電子マネー", "クラウドファンディング", "オンラインサロン", "シェアリングエコノミー"], answer: 1, explanation: "ファンディングは資金調達です。" },
  { category: "ネット通信とデジタル", question: "似た意見ばかりが集まる現象を何というか。", options: ["情報操作", "エコーチェンバー", "フィルタリング", "デジタルデトックス"], answer: 1, explanation: "反響室（エコーチェンバー）現象です。" },
  { category: "データのデジタル化", question: "段階的な値で表せるデータは？", options: ["アナログ", "デジタル", "連続", "波動"], answer: 1, explanation: "デジタルは離散的な値です。" },
  { category: "データのデジタル化", question: "デジタル化の正しい手順は？", options: ["量子化→標本化→符号化", "標本化→量子化→符号化", "符号化→標本化→量子化", "標本化→符号化→量子化"], answer: 1, explanation: "標本化→量子化→符号化の順です。" },
  { category: "データのデジタル化", question: "コンピュータの0と1は何の差？", options: ["電流", "電圧", "電線", "抵抗"], answer: 1, explanation: "電圧の高低（Low/High）です。" },
  { category: "データのデジタル化", question: "白黒画像（2値）の1画素のビット数は？", options: ["1ビット", "2ビット", "8ビット", "256ビット"], answer: 0, explanation: "2通り（0か1）なので1ビットです。" },
  { category: "データのデジタル化", question: "光の三原色は？", options: ["赤黄青", "CMY", "RGB", "白黒灰"], answer: 2, explanation: "RGB（赤緑青）が光の基本です。" },
  { category: "データのデジタル化", question: "フルカラー（8bit×3）は1画素何バイト？", options: ["1", "3", "8", "24"], answer: 1, explanation: "24ビット÷8＝3バイトです。" },
  { category: "データのデジタル化", question: "1KBは何B？", options: ["10", "100", "1000", "10000"], answer: 2, explanation: "問題文の計算式（今回は1000B）に従います。" },
  { category: "データのデジタル化", question: "圧縮後に戻せない圧縮方式は？", options: ["可逆", "非可逆", "展開", "暗号化"], answer: 1, explanation: "非可逆圧縮は効率的ですが劣化します。" },
  { category: "データのデジタル化", question: "600×400のフルカラー写真は何KB？", options: ["240", "720", "2400", "7200"], answer: 1, explanation: "600×400×3÷1000＝720KBです。" },
  { category: "情報デザイン", question: "不要な情報を捨てるデザインは？", options: ["可視化", "構造化", "抽象化", "標準化"], answer: 2, explanation: "抽象化で本質を抽出します。" },
  { category: "情報デザイン", question: "見えないものを見せるデザインは？", options: ["抽象化", "可視化", "構造化", "装飾化"], answer: 1, explanation: "可視化でグラフ化などを行います。" },
  { category: "情報デザイン", question: "情報同士を整理するのは？", options: ["抽象化", "可視化", "構造化", "符号化"], answer: 2, explanation: "構造化で関係性を示します。" },
  { category: "情報デザイン", question: "抽象化の例は？", options: ["年表", "ピクトグラム", "階層", "写真"], answer: 1, explanation: "ピクトグラムは単純化の代表です。" },
  { category: "情報デザイン", question: "デザイン思考のプロセスは？", options: ["定義→発想→検証→共感→試作", "共感→発想→定義→試作→検証", "共感→定義→発想→試作→検証", "定義→共感→試作→発想→検証"], answer: 2, explanation: "共感がスタートです。" },
  { category: "情報デザイン", question: "スクロールを促す手がかりは？", options: ["アイコン", "ピクトグラム", "シグニファイア", "アフォーダンス"], answer: 2, explanation: "シグニファイアは行動のサインです。" },
  { category: "情報デザイン", question: "ハートマークが不適切な場面は？", options: ["いいねボタン", "福祉のメールボタン", "健康管理", "体力メーター"], answer: 1, explanation: "機能と意味が一致しません。" },
  { category: "情報とメディア", question: "情報は誰かに伝えても手元から無くならない性質を何というか。", options: ["複製性", "残存性", "伝播性", "無形性"], answer: 1, explanation: "残存性（自分が使っても相手に伝わる）のことです。" },

  // --- 追加の30問 ---
  { category: "情報のデジタル化", question: "アナログ音声をデジタル化する際、音の強弱をどのくらい細かく区切るかを決める値を何というか。", options: ["標本化周波数", "量子化ビット数", "符号化速度", "解像度"], answer: 1, explanation: "量子化ビット数は振幅の細かさを決める値です。" },
  { category: "情報のデジタル化", question: "標本化（サンプリング）の頻度を高めるとどうなるか。", options: ["データ量が減る", "再現性が高まる", "処理が単純になる", "音質が劣化する"], answer: 1, explanation: "標本化間隔を短くするほど、元の波形に近づきます。" },
  { category: "情報のデジタル化", question: "2進数の 1010 を10進数に直すといくつになるか。", options: ["8", "10", "12", "14"], answer: 1, explanation: "8+2=10 です。" },
  { category: "情報のデジタル化", question: "8ビットで表現できる数値は何通りか。", options: ["8通り", "16通り", "128通り", "256通り"], answer: 3, explanation: "2の8乗＝256通りです。" },
  { category: "情報のデジタル化", question: "動画の圧縮方式において、前後のフレームとの差分のみを記録する圧縮を何というか。", options: ["フレーム間圧縮", "フレーム内圧縮", "静止画圧縮", "空間圧縮"], answer: 0, explanation: "変化した部分だけを記録してデータ量を減らします。" },
  { category: "情報デザイン", question: "「使いやすさ」に関する評価尺度を何というか。", options: ["ユーザビリティ", "アクセシビリティ", "ユニバーサルデザイン", "情報リテラシー"], answer: 0, explanation: "使いやすさ＝ユーザビリティです。" },
  { category: "情報デザイン", question: "高齢者や障がい者を含む、誰もが使いやすいデザインを何というか。", options: ["ユーザビリティ", "アクセシビリティ", "ユニバーサルデザイン", "フラットデザイン"], answer: 2, explanation: "ユニバーサルデザインは「みんなの」という意味です。" },
  { category: "情報デザイン", question: "Webサイトにおいて、どこに何があるか分かるようにする地図を何というか。", options: ["サイトマップ", "インデックス", "ハイパーリンク", "パンくずリスト"], answer: 0, explanation: "サイトマップはサイト全体の構造図です。" },
  { category: "情報デザイン", question: "情報デザインの目的として「誤っている」ものはどれか。", options: ["情報を整理する", "情報の意味を伝える", "情報を複雑にする", "ユーザーの行動を促す"], answer: 2, explanation: "デザインは情報をシンプルで分かりやすくするためのものです。" },
  { category: "情報モラル", question: "コンピュータが乗っ取られ、勝手にメール送信などをさせられるPCを何というか。", options: ["ゾンビPC", "クライアントPC", "サーバーPC", "ホストPC"], answer: 0, explanation: "ウイルスに感染して外部から操られる状態を指します。" },
  { category: "情報モラル", question: "ウイルスに感染させ、ファイルを暗号化して解除の金銭を要求するソフトは？", options: ["ランサムウェア", "フィッシング", "キーロガー", "スパイウェア"], answer: 0, explanation: "Ransom（身代金）を要求する悪意あるソフトです。" },
  { category: "情報モラル", question: "パスワードを解読するために、考えられる文字の組み合わせを全て試す手法は？", options: ["ブルートフォース攻撃", "辞書攻撃", "肩越し覗き見", "パスワードリスト攻撃"], answer: 0, explanation: "総当たり攻撃（力技）のことです。" },
  { category: "情報のデジタル化", question: "コンピュータの計算の最小単位である0か1を何というか。", options: ["バイト", "ビット", "ピクセル", "キロバイト"], answer: 1, explanation: "Binary digit（ビット）が最小単位です。" },
  { category: "情報のデジタル化", question: "アナログをデジタルにする際、時間を区切る作業を何というか。", options: ["標本化", "量子化", "符号化", "圧縮"], answer: 0, explanation: "連続的な時間を細切れにするのが標本化です。" },
  { category: "情報のデジタル化", question: "情報のデジタル化において、計算のしやすさから主に用いられるのは何進法か。", options: ["2進法", "8進法", "10進法", "16進法"], answer: 0, explanation: "コンピュータは0と1しか扱えないため2進法が基本です。" },
  { category: "情報デザイン", question: "現在のページが階層のどこにいるかを示すリストを何というか。", options: ["サイトマップ", "パンくずリスト", "メニューバー", "フッター"], answer: 1, explanation: "パンくずのように道の跡を示すのでこう呼ばれます。" },
  { category: "ネットコミュニケーション", question: "ネット炎上の原因になりやすいのは？", options: ["丁寧な言葉遣い", "情報の出典明記", "不用意な発言の拡散", "他者への配慮"], answer: 2, explanation: "不用意な発言がきっかけで批判が殺到することがあります。" },
  { category: "ネットコミュニケーション", question: "著作権法で、公表された著作物を自分の研究や教育などで利用する際、許可が不要な範囲を何というか。", options: ["私的利用", "公正な慣行", "許諾範囲", "著作権の制限"], answer: 0, explanation: "私的利用や引用などの制限があります。" },
  { category: "情報のデジタル化", question: "画像データを拡大してもギザギザにならない形式を何というか。", options: ["ビットマップ", "ベクターデータ", "JPEG", "GIF"], answer: 1, explanation: "ベクターは図形を計算で表すため拡大しても劣化しません。" },
  { category: "ネットコミュニケーション", question: "情報の真偽を確かめる「ファクトチェック」の意義として適切なのは？", options: ["情報の拡散を防ぐため", "情報の正確性を担保するため", "広告を表示するため", "SNSの利用を控えるため"], answer: 1, explanation: "情報の真偽を客観的に確認して正確性を保つ行為です。" },
  { category: "情報のデジタル化", question: "音量データの量子化ビット数を増やすとどうなる？", options: ["音質が良くなる", "データ量が減る", "録音時間が伸びる", "ノイズが増える"], answer: 0, explanation: "ビット数が増えるほど、音の強弱の階調が細かくなります。" },
  { category: "情報デザイン", question: "特定の機能を象徴する小さな画像を何というか。", options: ["ピクトグラム", "アイコン", "シグニファイア", "グラフィック"], answer: 1, explanation: "機能を示す画像はアイコンです。" },
  { category: "情報デザイン", question: "交通標識のような、言語を介さず図記号だけで意味を示すものを何というか。", options: ["ピクトグラム", "アイコン", "ロゴマーク", "インフォグラフィック"], answer: 0, explanation: "言語を超えて情報を伝える絵文字です。" },
  { category: "情報のデジタル化", question: "2進数の 1111 は10進数でいくつ？", options: ["7", "14", "15", "16"], answer: 2, explanation: "8+4+2+1=15 です。" },
  { category: "情報モラル", question: "インターネット上の誹謗中傷などにより、一度出した情報が消えなくなることを比喩して何というか。", options: ["デジタルタトゥー", "デジタルデバイド", "ネットの記憶", "悪意の痕跡"], answer: 0, explanation: "入れ墨（タトゥー）のように消えない記録を指します。" },
  { category: "情報デザイン", question: "情報をグラフやチャートにして視覚的に伝える手法を何というか。", options: ["インフォグラフィック", "写真表現", "抽象表現", "装飾デザイン"], answer: 0, explanation: "情報を視覚的にまとめて分かりやすくしたものです。" },
  { category: "情報デザイン", question: "Webページで、リンクであることが分かりやすいデザインの要素は？", options: ["下線・色", "太い文字", "画像のみ", "改行"], answer: 0, explanation: "一般的に下線や青文字でリンクであることを示します。" },
  { category: "情報のデジタル化", question: "画像の階調（色の段階）を増やすと、どういう現象が起こるか。", options: ["色が滑らかになる", "データ量が軽くなる", "画像がぼやける", "色が暗くなる"], answer: 0, explanation: "階調が多いほど色の変化が滑らかに表現されます。" },
  { category: "ネットコミュニケーション", question: "ネットでの発信時に「著作権」を気にすべき対象に含まれないのは？", options: ["他人が撮影した写真", "自作の文章", "有名なアーティストの曲", "テレビ番組のスクリーンショット"], answer: 1, explanation: "自作の文章であれば自分に著作権があるため気にしなくて良いです。" },
  { category: "情報のデジタル化", question: "デジタル化の最大のメリットは？", options: ["データが壊れない", "複製や加工が容易", "アナログより高品質", "容量がいらない"], answer: 1, explanation: "劣化なく複製・加工・保存ができるのが大きな利点です。" }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const categories = ['all', ...Array.from(new Set(allQuestions.map(q => q.category)))];

  const startQuiz = (category) => {
    let filtered = allQuestions;
    if (category !== 'all') {
      filtered = allQuestions.filter(q => q.category === category);
    }
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setIsAnswered(false);
    setSelectedOption(null);
    setCurrentScreen('quiz');
  };

  const handleAnswer = (optionIndex) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    const q = activeQuestions[currentIndex];
    if (optionIndex === q.answer) {
      setScore(s => s + 1);
    } else {
      setWrongAnswers(w => [...w, { q: q.question, s: q.options[optionIndex], c: q.options[q.answer], e: q.explanation }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans text-slate-800">
      {currentScreen === 'home' && (
        <div className="max-w-xl mx-auto text-center pt-10">
          <h1 className="text-3xl font-extrabold text-blue-900 mb-6">情報I 対策80問ドリル</h1>
          <button onClick={() => startQuiz('all')} className="w-full bg-blue-600 text-white p-5 rounded-2xl font-bold shadow-lg mb-6">全80問ランダム開始</button>
          <div className="grid grid-cols-2 gap-3">
            {categories.filter(c => c !== 'all').map(cat => (
              <button key={cat} onClick={() => startQuiz(cat)} className="bg-white border p-3 rounded-lg text-sm font-semibold">{cat}</button>
            ))}
          </div>
        </div>
      )}

      {currentScreen === 'quiz' && activeQuestions[currentIndex] && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-3xl shadow-sm border">
          <div className="text-xs text-blue-600 font-bold mb-2">{activeQuestions[currentIndex].category}</div>
          <div className="text-lg font-bold mb-6">{activeQuestions[currentIndex].question}</div>
          <div className="space-y-3">
            {activeQuestions[currentIndex].options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 text-left ${isAnswered ? (i === activeQuestions[currentIndex].answer ? 'bg-green-100 border-green-500' : (i === selectedOption ? 'bg-red-100 border-red-500' : 'bg-slate-50')) : 'bg-white hover:border-blue-300'}`}
              >{opt}</button>
            ))}
          </div>
          {isAnswered && (
            <div className="mt-6 p-4 bg-slate-100 rounded-xl text-sm">
              <p className="font-bold mb-1">解説</p>
              <p>{activeQuestions[currentIndex].explanation}</p>
              <button onClick={() => {
                if (currentIndex + 1 < activeQuestions.length) {
                  setCurrentIndex(currentIndex + 1); setIsAnswered(false); setSelectedOption(null);
                } else { setCurrentScreen('result'); }
              }} className="w-full mt-4 bg-slate-800 text-white p-3 rounded-lg font-bold">次へ</button>
            </div>
          )}
        </div>
      )}

      {currentScreen === 'result' && (
        <div className="max-w-xl mx-auto text-center pt-10">
          <h2 className="text-2xl font-bold mb-6">終了！スコア: {score}/{activeQuestions.length}</h2>
          <button onClick={() => setCurrentScreen('home')} className="bg-blue-600 text-white p-4 rounded-xl px-10">ホームへ</button>
        </div>
      )}
    </div>
  );
}