/* ================================================================
   CoinUSDT C2C — 真实路径路由 + 交易核心 + 多语言切换
   URL 示例: /login  /register  /trade/BTC  /wallet  /orders
   ================================================================ */

// ========== 多语言翻译系统 ==========
const I18N = {
  'zh-CN': { name:'简体中文', flag:'🇨🇳' },
  'zh-TW': { name:'繁體中文', flag:'🇹🇼' },
  'en':    { name:'English',   flag:'🇺🇸' },
  'ja':    { name:'日本語',    flag:'🇯🇵' },
  'ko':    { name:'한국어',    flag:'🇰🇷' },
  'es':    { name:'Español',   flag:'🇪🇸' },
  'ru':    { name:'Русский',   flag:'🇷🇺' },
  'fr':    { name:'Français',  flag:'🇫🇷' },
  'de':    { name:'Deutsch',   flag:'🇩🇪' },
  'pt':    { name:'Português', flag:'🇧🇷' },
  'vi':    { name:'Tiếng Việt',flag:'🇻🇳' },
  'th':    { name:'ไทย',       flag:'🇹🇭' },
};

// translation key -> { lang: text }
const DICT = {};
function d(key, texts) { DICT[key] = texts; }

// ====== 导航 & 通用 ======
d('login',     { 'zh-CN':'登录','zh-TW':'登錄',en:'Login',ja:'ログイン',ko:'로그인',es:'Iniciar',ru:'Вход',fr:'Connexion',de:'Anmelden',pt:'Entrar',vi:'Đăng nhập',th:'เข้าสู่ระบบ' });
d('register',  { 'zh-CN':'注册','zh-TW':'註冊',en:'Register',ja:'登録',ko:'회원가입',es:'Registrarse',ru:'Регистрация',fr:'Inscription',de:'Registrieren',pt:'Cadastrar',vi:'Đăng ký',th:'ลงทะเบียน' });
d('trade',     { 'zh-CN':'交易','zh-TW':'交易',en:'Trade',ja:'取引',ko:'거래',es:'Trading',ru:'Торговля',fr:'Trading',de:'Handel',pt:'Negociar',vi:'Giao dịch',th:'เทรด' });
d('assets',    { 'zh-CN':'资产','zh-TW':'資產',en:'Assets',ja:'資産',ko:'자산',es:'Activos',ru:'Активы',fr:'Actifs',de:'Vermögen',pt:'Ativos',vi:'Tài sản',th:'สินทรัพย์' });
d('orders',    { 'zh-CN':'订单','zh-TW':'訂單',en:'Orders',ja:'注文',ko:'주문',es:'Órdenes',ru:'Ордера',fr:'Ordres',de:'Aufträge',pt:'Ordens',vi:'Lệnh',th:'คำสั่ง' });
d('market_live',{'zh-CN':'行情实时','zh-TW':'行情實時',en:'Live Market',ja:'リアルタイム',ko:'실시간',es:'Mercado en vivo',ru:'Рынок онлайн',fr:'Marché en direct',de:'Live-Markt',pt:'Mercado ao vivo',vi:'Thị trường trực tiếp',th:'ตลาดสด' });
d('buy',       { 'zh-CN':'买入','zh-TW':'買入',en:'Buy',ja:'買い',ko:'매수',es:'Comprar',ru:'Купить',fr:'Acheter',de:'Kaufen',pt:'Comprar',vi:'Mua',th:'ซื้อ' });
d('sell',      { 'zh-CN':'卖出','zh-TW':'賣出',en:'Sell',ja:'売り',ko:'매도',es:'Vender',ru:'Продать',fr:'Vendre',de:'Verkaufen',pt:'Vender',vi:'Bán',th:'ขาย' });
d('market',    { 'zh-CN':'市价','zh-TW':'市價',en:'Market',ja:'成行',ko:'시장가',es:'Mercado',ru:'Рынок',fr:'Marché',de:'Market',pt:'Mercado',vi:'Thị trường',th:'ตลาด' });
d('limit',     { 'zh-CN':'限价','zh-TW':'限價',en:'Limit',ja:'指値',ko:'지정가',es:'Límite',ru:'Лимит',fr:'Limite',de:'Limit',pt:'Limite',vi:'Giới hạn',th:'จำกัด' });
d('pending',   { 'zh-CN':'挂单','zh-TW':'掛單',en:'Pending',ja:'待機中',ko:'대기',es:'Pendiente',ru:'Ожидание',fr:'En attente',de:'Ausstehend',pt:'Pendente',vi:'Chờ',th:'รอดำเนินการ' });
d('deposit',   { 'zh-CN':'充值','zh-TW':'充值',en:'Deposit',ja:'入金',ko:'입금',es:'Depositar',ru:'Пополнить',fr:'Déposer',de:'Einzahlen',pt:'Depositar',vi:'Nạp tiền',th:'ฝากเงิน' });
d('logout',    { 'zh-CN':'退出登录','zh-TW':'退出登錄',en:'Logout',ja:'ログアウト',ko:'로그아웃',es:'Salir',ru:'Выйти',fr:'Déconnexion',de:'Abmelden',pt:'Sair',vi:'Đăng xuất',th:'ออกจากระบบ' });
d('no_data',   { 'zh-CN':'暂无','zh-TW':'暫無',en:'None',ja:'なし',ko:'없음',es:'Nada',ru:'Нет',fr:'Aucun',de:'Keine',pt:'Nenhum',vi:'Không có',th:'ไม่มี' });
d('search',    { 'zh-CN':'搜索币种...','zh-TW':'搜尋幣種...',en:'Search coins...',ja:'検索...',ko:'코인 검색...',es:'Buscar...',ru:'Поиск...',fr:'Rechercher...',de:'Suchen...',pt:'Buscar...',vi:'Tìm kiếm...',th:'ค้นหา...' });
d('available', { 'zh-CN':'可用','zh-TW':'可用',en:'Available',ja:'利用可能',ko:'사용 가능',es:'Disponible',ru:'Доступно',fr:'Disponible',de:'Verfügbar',pt:'Disponível',vi:'Khả dụng',th:'ใช้ได้' });
d('holding',   { 'zh-CN':'持仓','zh-TW':'持倉',en:'Holding',ja:'保有',ko:'보유',es:'Tenencia',ru:'Позиция',fr:'Position',de:'Bestand',pt:'Posição',vi:'Nắm giữ',th:'ถือครอง' });
d('total',     { 'zh-CN':'总额','zh-TW':'總額',en:'Total',ja:'合計',ko:'총액',es:'Total',ru:'Итого',fr:'Total',de:'Gesamt',pt:'Total',vi:'Tổng',th:'รวม' });
d('fee',       { 'zh-CN':'手续费','zh-TW':'手續費',en:'Fee',ja:'手数料',ko:'수수료',es:'Comisión',ru:'Комиссия',fr:'Frais',de:'Gebühr',ru:'Комиссия',pt:'Taxa',vi:'Phí',th:'ค่าธรรมเนียม' });
d('amount',    { 'zh-CN':'数量','zh-TW':'數量',en:'Amount',ja:'数量',ko:'수량',es:'Cantidad',ru:'Кол-во',fr:'Montant',de:'Menge',pt:'Quantidade',vi:'Số lượng',th:'จำนวน' });
d('price',     { 'zh-CN':'价格','zh-TW':'價格',en:'Price',ja:'価格',ko:'가격',es:'Precio',ru:'Цена',fr:'Prix',de:'Preis',pt:'Preço',vi:'Giá',th:'ราคา' });
d('place_order',{'zh-CN':'下单','zh-TW':'下單',en:'Place Order',ja:'注文',ko:'주문하기',es:'Orden',ru:'Ордер',fr:'Ordre',de:'Order',pt:'Ordem',vi:'Đặt lệnh',th:'วางคำสั่ง' });
d('order_book',{'zh-CN':'订单簿','zh-TW':'訂單簿',en:'Order Book',ja:'板情報',ko:'호가창',es:'Libro',ru:'Стакан',fr:'Carnet',de:'Orderbuch',pt:'Livro',vi:'Sổ lệnh',th:'สมุดคำสั่ง' });
d('order_history',{'zh-CN':'订单历史','zh-TW':'訂單歷史',en:'Order History',ja:'注文履歴',ko:'주문내역',es:'Historial',ru:'История',fr:'Historique',de:'Verlauf',pt:'Histórico',vi:'Lịch sử',th:'ประวัติคำสั่ง' });
d('tx_history', {'zh-CN':'交易记录','zh-TW':'交易記錄',en:'Transactions',ja:'取引履歴',ko:'거래내역',es:'Transacciones',ru:'Транзакции',fr:'Transactions',de:'Transaktionen',pt:'Transações',vi:'Giao dịch',th:'ธุรกรรม' });
d('filled',    { 'zh-CN':'已成交','zh-TW':'已成交',en:'Filled',ja:'約定済',ko:'체결',es:'Ejecutado',ru:'Исполнен',fr:'Exécuté',de:'Ausgeführt',pt:'Executado',vi:'Đã khớp',th:'สำเร็จ' });
d('cancelled', { 'zh-CN':'已取消','zh-TW':'已取消',en:'Cancelled',ja:'取消済',ko:'취소됨',es:'Cancelado',ru:'Отменен',fr:'Annulé',de:'Storniert',pt:'Cancelado',vi:'Đã hủy',th:'ยกเลิก' });
d('insufficient',{'zh-CN':'余额不足，请先充值','zh-TW':'餘額不足，請先充值',en:'Insufficient balance, please deposit first',ja:'残高不足です。入金してください',ko:'잔액 부족, 입금해주세요',es:'Saldo insuficiente',ru:'Недостаточно средств',fr:'Solde insuffisant',de:'Guthaben nicht ausreichend',pt:'Saldo insuficiente',vi:'Số dư không đủ',th:'ยอดเงินไม่เพียงพอ' });
// 登录页
d('welcome',   { 'zh-CN':'欢迎回来','zh-TW':'歡迎回來',en:'Welcome Back',ja:'お帰りなさい',ko:'환영합니다',es:'Bienvenido',ru:'С возвращением',fr:'Bon retour',de:'Willkommen zurück',pt:'Bem-vindo',vi:'Chào mừng',th:'ยินดีต้อนรับ' });
d('login_sub', { 'zh-CN':'登录您的 CoinUSDT C2C 账户','zh-TW':'登錄您的 CoinUSDT C2C 賬戶',en:'Log in to your CoinUSDT C2C account',ja:'アカウントにログイン',ko:'계정에 로그인',es:'Inicie sesión',ru:'Войдите в аккаунт',fr:'Connectez-vous',de:'Melden Sie sich an',pt:'Faça login',vi:'Đăng nhập',th:'เข้าสู่ระบบ' });
d('username',  { 'zh-CN':'用户名','zh-TW':'用戶名',en:'Username',ja:'ユーザー名',ko:'사용자명',es:'Usuario',ru:'Имя',fr:'Identifiant',de:'Benutzername',pt:'Usuário',vi:'Tên',th:'ชื่อผู้ใช้' });
d('password',  { 'zh-CN':'密码','zh-TW':'密碼',en:'Password',ja:'パスワード',ko:'비밀번호',es:'Contraseña',ru:'Пароль',fr:'Mot de passe',de:'Passwort',pt:'Senha',vi:'Mật khẩu',th:'รหัสผ่าน' });
d('create_acct',{'zh-CN':'创建账户','zh-TW':'創建賬戶',en:'Create Account',ja:'アカウント作成',ko:'계정 만들기',es:'Crear cuenta',ru:'Создать',fr:'Créer un compte',de:'Konto erstellen',pt:'Criar conta',vi:'Tạo tài khoản',th:'สร้างบัญชี' });
d('reg_sub',   { 'zh-CN':'开启您的加密货币交易之旅','zh-TW':'開啓您的加密貨幣交易之旅',en:'Start your crypto trading journey',ja:'暗号資産取引を始めよう',ko:'암호화폐 거래 시작',es:'Comience su viaje cripto',ru:'Начните торговать',fr:'Commencez votre voyage crypto',de:'Starten Sie Ihre Krypto-Reise',pt:'Comece sua jornada cripto',vi:'Bắt đầu giao dịch crypto',th:'เริ่มต้นการเทรดคริปโต' });
d('dont_have_account',{'zh-CN':'还没有账户？','zh-TW':'還沒有賬戶？',en:'Don\'t have an account?',ja:'アカウントをお持ちでない？',ko:'계정이 없으신가요?',es:'¿No tiene cuenta?',ru:'Нет аккаунта?',fr:'Pas de compte ?',de:'Noch kein Konto?',pt:'Não tem conta?',vi:'Chưa có tài khoản?',th:'ยังไม่มีบัญชี?' });
d('already_have_account',{'zh-CN':'已有账户？','zh-TW':'已有賬戶？',en:'Already have an account?',ja:'アカウントをお持ちですか？',ko:'이미 계정이 있으신가요?',es:'¿Ya tiene cuenta?',ru:'Уже есть аккаунт?',fr:'Déjà un compte ?',de:'Haben Sie ein Konto?',pt:'Já tem conta?',vi:'Đã có tài khoản?',th:'มีบัญชีแล้ว?' });

// ====== 24h 统计 ======
d('24h_high',  { 'zh-CN':'24h 高','zh-TW':'24h 高',en:'24h High',ja:'24h 高値',ko:'24h 고가',es:'24h Máx',ru:'24ч Макс',fr:'24h Haut',de:'24h Hoch',pt:'24h Alta',vi:'24h Cao',th:'24h สูง' });
d('24h_low',   { 'zh-CN':'24h 低','zh-TW':'24h 低',en:'24h Low',ja:'24h 安値',ko:'24h 저가',es:'24h Mín',ru:'24ч Мин',fr:'24h Bas',de:'24h Tief',pt:'24h Baixa',vi:'24h Thấp',th:'24h ต่ำ' });
d('24h_vol',   { 'zh-CN':'24h Vol','zh-TW':'24h Vol',en:'24h Vol',ja:'24h 出来高',ko:'24h 거래량',es:'24h Vol',ru:'24ч Объём',fr:'24h Vol',de:'24h Vol',pt:'24h Vol',vi:'24h KL',th:'24h ปริมาณ' });

// ====== 币种还原 ======
d('favorites', { 'zh-CN':'自选','zh-TW':'自選',en:'Favorites',ja:'お気に入り',ko:'즐겨찾기',es:'Favoritos',ru:'Избранное',fr:'Favoris',de:'Favoriten',pt:'Favoritos',vi:'Yêu thích',th:'รายการโปรด' });
d('all_pairs', { 'zh-CN':'全部','zh-TW':'全部',en:'All',ja:'全て',ko:'전체',es:'Todo',ru:'Все',fr:'Tout',de:'Alle',pt:'Todos',vi:'Tất cả',th:'ทั้งหมด' });
d('total_value',{'zh-CN':'总估值','zh-TW':'總估值',en:'Total Value',ja:'評価総額',ko:'총 평가',es:'Valor total',ru:'Оценка',fr:'Valeur totale',de:'Gesamtwert',pt:'Valor total',vi:'Tổng giá trị',th:'มูลค่ารวม' });
d('latest_price',{'zh-CN':'最新价','zh-TW':'最新價',en:'Price',ja:'価格',ko:'가격',es:'Precio',ru:'Цена',fr:'Prix',de:'Preis',pt:'Preço',vi:'Giá',th:'ราคา' });
d('24h_change',{'zh-CN':'24h涨跌','zh-TW':'24h漲跌',en:'24h Change',ja:'24h変動',ko:'24h 변동',es:'24h Cambio',ru:'24ч Изм',fr:'24h Var',de:'24h Änd',pt:'24h Mud',vi:'24h Thay đổi',th:'24h เปลี่ยน' });
d('cancel_all',{'zh-CN':'全部取消','zh-TW':'全部取消',en:'Cancel All',ja:'全て取消',ko:'전체 취소',es:'Cancelar todo',ru:'Отменить все',fr:'Tout annuler',de:'Alle stornieren',pt:'Cancelar tudo',vi:'Hủy tất cả',th:'ยกเลิกทั้งหมด' });
d('copy_addr', { 'zh-CN':'复制','zh-TW':'複製',en:'Copy',ja:'コピー',ko:'복사',es:'Copiar',ru:'Копировать',fr:'Copier',de:'Kopieren',pt:'Copiar',vi:'Sao chép',th:'คัดลอก' });
d('transfer_done',{'zh-CN':'我已完成转账，确认到账','zh-TW':'我已完成轉賬，確認到賬',en:'I have transferred, confirm deposit',ja:'送金完了、入金を確認',ko:'송금 완료, 입금 확인',es:'He transferido, confirmar',ru:'Я перевел, подтвердить',fr:'J\'ai transféré, confirmer',de:'Überwiesen, bestätigen',pt:'Transferi, confirmar',vi:'Đã chuyển, xác nhận',th:'โอนแล้ว ยืนยัน' });
d('back',      { 'zh-CN':'返回修改','zh-TW':'返回修改',en:'Back',ja:'戻る',ko:'뒤로',es:'Volver',ru:'Назад',fr:'Retour',de:'Zurück',pt:'Voltar',vi:'Quay lại',th:'กลับ' });
d('copy_failed',{'zh-CN':'复制失败，请手动复制','zh-TW':'複製失敗，請手動複製',en:'Copy failed, please copy manually',ja:'コピー失敗、手動でコピーしてください',ko:'복사 실패, 수동으로 복사해주세요',es:'Error al copiar',ru:'Ошибка копирования',fr:'Échec de la copie',de:'Kopieren fehlgeschlagen',pt:'Falha ao copiar',vi:'Sao chép thất bại',th:'คัดลอกล้มเหลว' });
d('email',     {'zh-CN':'邮箱','zh-TW':'郵箱',en:'Email',ja:'メール',ko:'이메일',es:'Email',ru:'Email',fr:'Email',de:'E-Mail',pt:'Email',vi:'Email',th:'อีเมล' });
d('send_code', {'zh-CN':'发送验证码','zh-TW':'發送驗證碼',en:'Send Verification Code',ja:'認証コード送信',ko:'인증코드 전송',es:'Enviar código',ru:'Отправить код',fr:'Envoyer le code',de:'Code senden',pt:'Enviar código',vi:'Gửi mã',th:'ส่งรหัส' });
d('verify_code',{'zh-CN':'验证码','zh-TW':'驗證碼',en:'Verification Code',ja:'認証コード',ko:'인증코드',es:'Código',ru:'Код',fr:'Code',de:'Code',pt:'Código',vi:'Mã xác nhận',th:'รหัสยืนยัน' });
d('verify_hint',{'zh-CN':'验证码已发送。输入下方6位数字','zh-TW':'驗證碼已發送。輸入下方6位數字',en:'Verification code sent. Enter the 6-digit code below',ja:'認証コードを送信しました。6桁のコードを入力',ko:'인증코드 발송됨. 아래 6자리 입력',es:'Código enviado. Ingrese el código de 6 dígitos',ru:'Код отправлен. Введите 6 цифр',fr:'Code envoyé. Entrez le code à 6 chiffres',de:'Code gesendet. 6-stelligen Code eingeben',pt:'Código enviado. Digite o código de 6 dígitos',vi:'Đã gửi mã. Nhập mã 6 số',th:'ส่งรหัสแล้ว กรอก 6 หลัก' });
d('complete_reg',{'zh-CN':'完成注册','zh-TW':'完成註冊',en:'Complete Registration',ja:'登録完了',ko:'가입 완료',es:'Completar registro',ru:'Завершить',fr:'Terminer',de:'Registrierung abschließen',pt:'Concluir cadastro',vi:'Hoàn tất',th:'ลงทะเบียน' });
d('ohlc_open',  {'zh-CN':'开','zh-TW':'開',en:'O',ja:'始',ko:'시가',es:'A',ru:'O',fr:'O',de:'E',pt:'A',vi:'Mở',th:'เปิด' });
d('ohlc_high',  {'zh-CN':'高','zh-TW':'高',en:'H',ja:'高',ko:'고가',es:'Max',ru:'H',fr:'H',de:'H',pt:'Max',vi:'Cao',th:'สูง' });
d('ohlc_low',   {'zh-CN':'低','zh-TW':'低',en:'L',ja:'安',ko:'저가',es:'Min',ru:'L',fr:'L',de:'T',pt:'Min',vi:'Thấp',th:'ต่ำ' });
d('ohlc_close', {'zh-CN':'收','zh-TW':'收',en:'C',ja:'終',ko:'종가',es:'C',ru:'C',fr:'C',de:'S',pt:'F',vi:'Đóng',th:'ปิด' });
d('fill_all_fields',{'zh-CN':'请填写所有字段','zh-TW':'請填寫所有欄位',en:'Please fill in all fields',ja:'全ての項目を入力',ko:'모든 항목 입력',es:'Complete todos los campos',ru:'Заполните все поля',fr:'Veuillez tout remplir',de:'Alle Felder ausfüllen',pt:'Preencha todos',vi:'Điền tất cả',th:'กรอกทุกช่อง' });
d('invalid_email',{'zh-CN':'邮箱格式无效','zh-TW':'郵箱格式無效',en:'Invalid email format',ja:'無効なメール',ko:'잘못된 이메일',es:'Email inválido',ru:'Неверный email',fr:'Email invalide',de:'Ungültige E-Mail',pt:'Email inválido',vi:'Email không hợp lệ',th:'อีเมลไม่ถูกต้อง' });
d('username_too_short',{'zh-CN':'用户名至少3个字符','zh-TW':'用戶名至少3個字符',en:'Username needs at least 3 characters',ja:'3文字以上必要',ko:'3자 이상 필요',es:'Mínimo 3 caracteres',ru:'Минимум 3 символа',fr:'3 caractères minimum',de:'Mindestens 3 Zeichen',pt:'Mínimo 3 caracteres',vi:'Ít nhất 3 ký tự',th:'อย่างน้อย 3 ตัว' });
d('password_too_short',{'zh-CN':'密码至少6个字符','zh-TW':'密碼至少6個字符',en:'Password needs at least 6 characters',ja:'6文字以上必要',ko:'6자 이상 필요',es:'Mínimo 6 caracteres',ru:'Минимум 6 символов',fr:'6 caractères minimum',de:'Mindestens 6 Zeichen',pt:'Mínimo 6 caracteres',vi:'Ít nhất 6 ký tự',th:'อย่างน้อย 6 ตัว' });
d('enter_verify_code',{'zh-CN':'请输入验证码','zh-TW':'請輸入驗證碼',en:'Please enter verification code',ja:'認証コードを入力',ko:'인증코드 입력',es:'Ingrese el código',ru:'Введите код',fr:'Entrez le code',de:'Code eingeben',pt:'Digite o código',vi:'Nhập mã',th:'กรอกรหัส' });
d('invite_title',{'zh-CN':'邀请好友','zh-TW':'邀請好友',en:'Invite Friends',ja:'友達を招待',ko:'친구 초대',es:'Invitar amigos',ru:'Пригласить',fr:'Inviter des amis',de:'Freunde einladen',pt:'Convidar amigos',vi:'Mời bạn bè',th:'เชิญเพื่อน' });
d('invite_desc',{'zh-CN':'分享您的邀请码，获得奖励','zh-TW':'分享您的邀請碼，獲得獎勵',en:'Share your invite code and earn rewards',ja:'招待コードを共有して報酬獲得',ko:'초대 코드 공유하고 보상 받기',es:'Comparte tu código y gana',ru:'Поделитесь кодом и получите бонусы',fr:'Partagez votre code et gagnez',de:'Code teilen und belohnt werden',pt:'Compartilhe seu código',vi:'Chia sẻ mã mời',th:'แชร์รหัสเชิญ' });
d('your_invite_code',{'zh-CN':'您的邀请码','zh-TW':'您的邀請碼',en:'Your Invite Code',ja:'招待コード',ko:'초대 코드',es:'Tu código',ru:'Ваш код',fr:'Votre code',de:'Ihr Code',pt:'Seu código',vi:'Mã của bạn',th:'รหัสของคุณ' });
d('copy_invite_link',{'zh-CN':'复制邀请链接','zh-TW':'複製邀請鏈接',en:'Copy Invite Link',ja:'招待リンクをコピー',ko:'초대 링크 복사',es:'Copiar enlace',ru:'Копировать ссылку',fr:'Copier le lien',de:'Link kopieren',pt:'Copiar link',vi:'Sao chép link',th:'คัดลอกลิงก์' });
d('invited_friends',{'zh-CN':'已邀请好友','zh-TW':'已邀請好友',en:'Friends Invited',ja:'招待した友達',ko:'초대한 친구',es:'Amigos invitados',ru:'Приглашено',fr:'Amis invités',de:'Eingeladene Freunde',pt:'Amigos convidados',vi:'Bạn đã mời',th:'เพื่อนที่เชิญ' });
d('invite_link_copied',{'zh-CN':'邀请链接已复制！','zh-TW':'邀請鏈接已複製！',en:'Invite link copied!',ja:'招待リンクをコピーしました！',ko:'초대 링크 복사됨!',es:'¡Enlace copiado!',ru:'Ссылка скопирована!',fr:'Lien copié !',de:'Link kopiert!',pt:'Link copiado!',vi:'Đã sao chép link!',th:'คัดลอกลิงก์แล้ว!' });
d('optional',{'zh-CN':'（可选）','zh-TW':'（可選）',en:'(optional)',ja:'（任意）',ko:'(선택)',es:'(opcional)',ru:'(опционально)',fr:'(optionnel)',de:'(optional)',pt:'(opcional)',vi:'(tùy chọn)',th:'(ไม่บังคับ)' });
d('invite_code_label',{'zh-CN':'邀请码','zh-TW':'邀請碼',en:'Invite Code',ja:'招待コード',ko:'초대 코드',es:'Codigo de invitacion',ru:'Код приглашения',fr:'Code invitation',de:'Einladungscode',pt:'Codigo de convite',vi:'Ma moi',th:'รหัสเชิญ' });
d('deposit_addr',{'zh-CN':'充值地址','zh-TW':'充值地址',en:'Deposit Address',ja:'入金アドレス',ko:'입금 주소',es:'Dirección',ru:'Адрес',fr:'Adresse',de:'Adresse',pt:'Endereço',vi:'Địa chỉ',th:'ที่อยู่' });
d('deposit_amt',{'zh-CN':'充值金额','zh-TW':'充值金額',en:'Deposit Amount',ja:'入金額',ko:'입금액',es:'Monto',ru:'Сумма',fr:'Montant',de:'Betrag',pt:'Valor',vi:'Số tiền',th:'จำนวนเงิน' });
d('deposit_coin',{'zh-CN':'充值币种','zh-TW':'充值幣種',en:'Deposit Coin',ja:'入金通貨',ko:'입금 코인',es:'Moneda',ru:'Монета',fr:'Pièce',de:'Coin',pt:'Moeda',vi:'Loại coin',th:'เหรียญ' });
d('deposit_title',{'zh-CN':'充值','zh-TW':'充值',en:'Deposit',ja:'入金',ko:'입금',es:'Depositar',ru:'Пополнить',fr:'Déposer',de:'Einzahlen',pt:'Depositar',vi:'Nạp',th:'ฝาก' });
d('sim_deposit',{'zh-CN':'模拟充值','zh-TW':'模擬充值',en:'Simulated Deposit',ja:'模擬入金',ko:'모의 입금',es:'Depósito simulado',ru:'Сим.пополнение',fr:'Dépôt simulé',de:'Simulierte Einzahlung',pt:'Depósito simulado',vi:'Nạp mô phỏng',th:'ฝากจำลอง' });
d('deposit_next',{'zh-CN':'下一步','zh-TW':'下一步',en:'Next',ja:'次へ',ko:'다음',es:'Siguiente',ru:'Далее',fr:'Suivant',de:'Weiter',pt:'Próximo',vi:'Tiếp',th:'ถัดไป' });
d('deposit_request_submitted',{'zh-CN':'充值申请已提交！{amount} USDT 等待后台审核','zh-TW':'充值申請已提交！{amount} USDT 等待後台審核',en:'Deposit request submitted! {amount} USDT pending review',ja:'入金申請を送信しました！{amount} USDT 審査待ち',ko:'입금 신청 완료! {amount} USDT 승인 대기중',es:'¡Solicitud enviada! {amount} USDT pendiente de revisión',ru:'Заявка отправлена! {amount} USDT ожидает проверки',fr:'Demande envoyée ! {amount} USDT en attente',de:'Antrag gesendet! {amount} USDT wartet auf Prüfung',pt:'Pedido enviado! {amount} USDT aguardando revisão',vi:'Đã gửi yêu cầu! {amount} USDT đang chờ duyệt',th:'ส่งคำขอแล้ว! {amount} USDT รอตรวจสอบ' });
d('order_cancelled',{'zh-CN':'订单已取消','zh-TW':'訂單已取消',en:'Order cancelled',ja:'注文を取消しました',ko:'주문이 취소되었습니다',es:'Orden cancelada',ru:'Ордер отменён',fr:'Ordre annulé',de:'Order storniert',pt:'Ordem cancelada',vi:'Lệnh đã hủy',th:'คำสั่งถูกยกเลิก' });
d('all_cancelled',{'zh-CN':'已取消所有挂单','zh-TW':'已取消所有掛單',en:'All pending orders cancelled',ja:'全ての待機注文を取消しました',ko:'모든 대기 주문이 취소되었습니다',es:'Todas las órdenes canceladas',ru:'Все ордера отменены',fr:'Tous les ordres annulés',de:'Alle Aufträge storniert',pt:'Todas as ordens canceladas',vi:'Đã hủy tất cả lệnh chờ',th:'ยกเลิกคำสั่งที่รอทั้งหมด' });

window.t = function(key) {
  const entry = DICT[key];
  if (!entry) return key;
  return entry[currentLang] || entry['en'] || key;
};

// 新版默认英语，清除旧语言缓存
if (!localStorage.getItem('ct_lang_v2')) {
  localStorage.removeItem('ct_lang');
  localStorage.setItem('ct_lang_v2', '1');
}
let currentLang = localStorage.getItem('ct_lang') || 'en';

window.setLang = function(lang) {
  currentLang = lang;
  localStorage.setItem('ct_lang', lang);
  applyLang();
  // 更新 URL 中的语言前缀
  const path = getHashPath();
  const newPath = path.replace(/^\/(en|zh-CN|zh-TW|ja|ko|es|ru|fr|de|pt|vi|th)\//, '/' + lang + '/');
  if (newPath !== path) {
    history.replaceState(null, '', '#' + newPath);
  }
  // 关闭下拉
  const drop = document.getElementById('lang-drop');
  if (drop) drop.classList.add('hidden');
  // 重绘
  if (!document.getElementById('page-trade').classList.contains('hidden')) {
    updateAll();
  }
};

function applyLang() {
  const info = I18N[currentLang];
  const btn = $('lang-current');
  if (btn && info) btn.innerHTML = info.flag + ' ' + info.name;

  // 更新所有 data-i18n 元素
  $$('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  // 更新 placeholder
  $$('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // 语言下拉高亮
  $$('.lang-option').forEach(o => o.classList.toggle('active', o.dataset.lang === currentLang));

  // 更新搜索框 placeholder
  const searchEl = $('market-search');
  if (searchEl) searchEl.placeholder = t('search');

  // 更新标题
  document.title = t('trade') + ' | CoinTrade Pro';
}

// ========== 状态 ==========
const ST = {
  token: localStorage.getItem('ct_token') || null,
  user: JSON.parse(localStorage.getItem('ct_user') || 'null'),
  prices: {},
  symbol: 'BTC',
  side: 'buy',
  orderType: 'market',
  interval: '4h',
  klines: [],
  orderbook: { bids: [], asks: [] },
  sortKey: 'vol',
  timers: []
};
const FEE = 0.001;

// ========== API ==========
const api = {
  async req(url, opts = {}) {
    const h = { 'Content-Type': 'application/json' };
    if (ST.token) h['Authorization'] = 'Bearer ' + ST.token;
    const r = await fetch(url, { ...opts, headers: h });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || '请求失败');
    return d;
  },
  get: url => api.req(url),
  post: (url, body) => api.req(url, { method: 'POST', body: JSON.stringify(body) })
};

// ========== 币安 API 实时数据 ==========
const ALL_SYMBOLS = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'AVAX', 'DOT', 'MATIC', 'LINK', 'UNI', 'ATOM', 'LTC', 'FIL'];
const BASE_PRICES = { BTC:87000, ETH:3400, BNB:620, SOL:145, XRP:2.3, ADA:0.70, DOGE:0.17, AVAX:37, DOT:6.8, MATIC:0.55, LINK:14.5, UNI:8.5, ATOM:7.0, LTC:80, FIL:5.0 };
let _fallbackCache = null;
let _binanceOnline = false;

// 缓存币安限流: 短时间内同一endpoint不重复请求
var _bCache = {};
function _bGet(url, ttl) {
  var now = Date.now();
  var e = _bCache[url];
  if (e && (now - e.ts) < (ttl || 2000)) return Promise.resolve(e.data);
  return fetch(url).then(function(r) {
    if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + r.statusText);
    return r.json();
  }).then(function(d) {
    _bCache[url] = { data: d, ts: now };
    _binanceOnline = true;
    return d;
  });
}

// 从币安获取全部24h行情
function fetchBinancePrices() {
  return _bGet('https://api.binance.com/api/v3/ticker/24hr', 3000).then(function(data) {
    if (!Array.isArray(data)) throw new Error('Invalid response');
    var prices = {};
    ALL_SYMBOLS.forEach(function(s) {
      var sym = s + 'USDT';
      var t = data.find(function(x) { return x.symbol === sym; });
      if (t) {
        var p = parseFloat(t.lastPrice);
        prices[s] = {
          name: s,
          price: p,
          change24h: parseFloat(t.priceChangePercent),
          high24h: parseFloat(t.highPrice),
          low24h: parseFloat(t.lowPrice),
          volume24h: parseFloat(t.volume)
        };
      }
    });
    return { prices: prices, source: 'Binance' };
  }).catch(function(e) {
    console.warn('Binance 24hr failed:', e.message);
    _binanceOnline = false;
    throw e;
  });
}

// 从币安获取K线
function fetchBinanceKlines(symbol, interval) {
  var sym = symbol + 'USDT';
  var limit = { '1m':200,'5m':200,'15m':200,'30m':150,'1h':100,'4h':80,'1d':60,'1w':40 }[interval] || 100;
  var url = 'https://api.binance.com/api/v3/klines?symbol=' + sym + '&interval=' + interval + '&limit=' + limit;
  return _bGet(url, 2000).then(function(data) {
    if (!Array.isArray(data)) throw new Error('Invalid kline response');
    return data.map(function(k) {
      return {
        time: k[0],
        open: parseFloat(k[1]),
        high: parseFloat(k[2]),
        low: parseFloat(k[3]),
        close: parseFloat(k[4]),
        volume: parseFloat(k[5])
      };
    });
  });
}

// 从币安获取深度
function fetchBinanceDepth(symbol) {
  var sym = symbol + 'USDT';
  return _bGet('https://api.binance.com/api/v3/depth?symbol=' + sym + '&limit=20', 2000).then(function(d) {
    var bids = d.bids.slice(0, 20).map(function(b) { return [parseFloat(b[0]), parseFloat(b[1])]; });
    var asks = d.asks.slice(0, 20).map(function(a) { return [parseFloat(a[0]), parseFloat(a[1])]; });
    return { bids: bids, asks: asks, price: parseFloat(d.asks[0][0]), source: 'Binance' };
  });
}

// ========== CoinGecko K线备源 (完全支持CORS) ==========
var _cgIds = { BTC:'bitcoin', ETH:'ethereum', BNB:'binancecoin', SOL:'solana', XRP:'ripple', ADA:'cardano', DOGE:'dogecoin', AVAX:'avalanche-2', DOT:'polkadot', MATIC:'matic-network', LINK:'chainlink', UNI:'uniswap', ATOM:'cosmos', LTC:'litecoin', FIL:'filecoin' };
// days→interval映射: 返回的K线原始粒度
var _cgIntToDays = { '1m':1, '5m':1, '15m':1, '30m':2, '1h':7, '4h':30, '1d':90, '1w':365 };
var _cgRawInterval = { '1m':'minutely','5m':'5minute','15m':'hourly','30m':'hourly','1h':'hourly','4h':'hourly','1d':'daily','1w':'weekly' };
var _cgCache = {};

function fetchCoinGeckoKlines(symbol, interval) {
  var cgId = _cgIds[symbol];
  if (!cgId) return Promise.reject(new Error('Unknown symbol'));
  var days = _cgIntToDays[interval] || 7;
  var rawInt = _cgRawInterval[interval] || 'hourly';

  // CoinGecko OHLC 返回 [timestamp, open, high, low, close]
  var url = 'https://api.coingecko.com/api/v3/coins/' + cgId + '/market_chart?vs_currency=usd&days=' + days;

  // 缓存Key
  var ck = url;
  var now = Date.now();
  var ce = _cgCache[ck];
  if (ce && (now - ce.ts) < 15000) return Promise.resolve(ce.data);

  return fetch(url).then(function(r) {
    if (!r.ok) throw new Error('CoinGecko HTTP ' + r.status);
    return r.json();
  }).then(function(data) {
    if (!data.prices || !data.prices.length) throw new Error('No price data');
    // 将prices转换为OHLC-like数据
    var klines = [];
    var prices = data.prices;
    var total_volumes = data.total_volumes || [];
    var STEP = prices.length > 500 ? Math.ceil(prices.length / 200) : 1;

    for (var i = 0; i < prices.length; i += STEP) {
      var slice = prices.slice(i, Math.min(i + STEP, prices.length));
      var opens = slice[0];
      var close = slice[slice.length - 1];
      var high = slice.reduce(function(a, b) { return b[1] > a ? b[1] : a; }, slice[0][1]);
      var low = slice.reduce(function(a, b) { return b[1] < a ? b[1] : a; }, slice[0][1]);
      var vol = total_volumes.length ? (total_volumes[Math.min(i + STEP - 1, total_volumes.length - 1)] || [0,0])[1] || 0 : 0;
      klines.push({
        time: opens[0],
        open: +opens[1].toFixed(6),
        high: +high.toFixed(6),
        low: +low.toFixed(6),
        close: +close[1].toFixed(6),
        volume: +vol.toFixed(2)
      });
    }
    // 只保留最近200根
    if (klines.length > 200) klines = klines.slice(-200);
    _cgCache[ck] = { data: klines, ts: now };
    return klines;
  });
}

// ========== 统一K线获取 (币安 → CoinGecko → 模拟) ==========
function getKlines(symbol, interval) {
  return fetchBinanceKlines(symbol, interval).then(function(data) {
    var st = document.getElementById('chart-source');
    if (st) st.textContent = 'Binance';
    return data;
  }).catch(function() {
    return fetchCoinGeckoKlines(symbol, interval).then(function(data) {
      var st = document.getElementById('chart-source');
      if (st) st.textContent = 'CoinGecko';
      return data;
    });
  }).catch(function() {
    var st = document.getElementById('chart-source');
    if (st) st.textContent = 'Simulated';
    return genFallbackKlines(symbol, interval);
  });
}

// ========== 降级模拟行情 ==========
function genFallbackPrices() {
  if (_fallbackCache && !_fallbackCache._rotated) {
    _fallbackCache._rotated = true;
    return _fallbackCache;
  }
  var prices = {};
  ALL_SYMBOLS.forEach(function(s) {
    var bp = BASE_PRICES[s] || 10;
    var change = (Math.random() - 0.48) * 10;
    var price = bp * (1 + change / 100);
    var vol = (10000000 + Math.random() * 5000000000);
    prices[s] = {
      name: s,
      price: +price.toFixed(price >= 1 ? 2 : 6),
      change24h: +change.toFixed(2),
      high24h: +(price * (1 + Math.abs(change)/100 + Math.random()*0.02)).toFixed(price>=1?2:6),
      low24h:  +(price * (1 - Math.abs(change)/100 - Math.random()*0.02)).toFixed(price>=1?2:6),
      volume24h: +vol.toFixed(0)
    };
  });
  _fallbackCache = { prices: prices, warning: true, cached: false, _rotated: false };
  return _fallbackCache;
}
function genFallbackOrderbook(symbol, basePrice) {
  var p = basePrice || (ST.prices[symbol]?.price || BASE_PRICES[symbol] || 10);
  var bids = [], asks = [];
  for (var i = 0; i < 20; i++) {
    var bp = p * (1 - (i+1)*0.0005 - Math.random()*0.0003);
    var ap = p * (1 + (i+1)*0.0005 + Math.random()*0.0003);
    bids.push([+bp.toFixed(p>=1?2:6), +(Math.random()*p*0.1).toFixed(4)]);
    asks.push([+ap.toFixed(p>=1?2:6), +(Math.random()*p*0.1).toFixed(4)]);
  }
  return { bids: bids, asks: asks, price: p };
}
// 带趋势的随机游走 K 线生成器 —— 模拟真实市场走势
function genFallbackKlines(symbol, interval) {
  var lens = { '1m':200,'5m':200,'15m':200,'30m':150,'1h':100,'4h':80,'1d':60,'1w':40 };
  var len = lens[interval] || 80;
  var msMap = { '1m':60000,'5m':300000,'15m':900000,'30m':1800000,'1h':3600000,'4h':14400000,'1d':86400000,'1w':604800000 };
  var ms = msMap[interval] || 3600000;
  var bp = ST.prices[symbol]?.price || BASE_PRICES[symbol] || 10;
  var k = [], now = Date.now();

  // === 阶段 1: 生成趋势驱动的基础价格线 ===
  // 用种子生成伪随机序列，保证同一币种同一周期走势一致
  var seed = hashStr(symbol) + hashStr(interval);
  var points = [];
  // 价格波动率：模拟真实市场（BTC 1m≈0.08%, 1h≈0.8%, 1d≈4%）
  var volatility = { '1m':0.0008,'5m':0.0015,'15m':0.003,'30m':0.005,'1h':0.008,'4h':0.015,'1d':0.03,'1w':0.07 }[interval] || 0.005;

  // 生成多段趋势：每段有一个方向(+1涨/-1跌)和持续时间
  var price = bp;
  var segmentLen = Math.floor(len / 4);
  var trendDir = 0;

  for (var i = 0; i <= len; i++) {
    // 每 segmentLen 根K线换个趋势方向
    if (i % segmentLen === 0) {
      trendDir = prng(seed + i * 1000) > 0.35 ? (prng(seed + i * 2000) > 0.5 ? 1 : -1) : 0;
    }

    // 价格漂移 = 趋势项 + 随机项
    var drift = trendDir * volatility * bp * 0.6;
    var noise = (prng(seed + i * 3 + 777) - 0.5) * volatility * bp * 2;
    var change = drift + noise;

    // 限制单根K线最大波动
    var maxMove = bp * volatility * 5;
    change = Math.max(-maxMove, Math.min(maxMove, change));

    price += change;
    price = Math.max(bp * 0.7, Math.min(bp * 1.5, price));
    points.push(price);
  }

  // === 阶段 2: 基于价格线生成 OHLC K线 ===
  // 每根K线的本体+影线比例接近真实市场（本体占30-60%蜡烛总范围）
  for (var i = 0; i < points.length; i++) {
    var trendP = points[i];
    var prevP = i > 0 ? points[i - 1] : bp;

    // open 从上根 close 开始（连续市场，无跳空）
    var open = i > 0 ? k[i-1].close : prevP;

    // 预期这根蜡烛的移动范围
    var expectedRange = volatility * bp * 5;

    // 蜡烛涨跌方向：70%跟随趋势，30%随机
    var followTrend = prng(seed + i * 19 + 777) < 0.7;
    var up = followTrend ? (trendP >= open) : (prng(seed + i * 23 + 888) > 0.5);

    // 本体高度 = 蜡烛范围的 30%-60%
    var bodyPct = 0.3 + prng(seed + i * 29 + 999) * 0.3;
    var bodySize = expectedRange * bodyPct;

    var close;
    if (up) {
      close = open + bodySize;
      close = Math.min(close, trendP + expectedRange * 0.3);
    } else {
      close = open - bodySize;
      close = Math.max(close, trendP - expectedRange * 0.3);
    }

    // 确保 close 始终在价格线附近合理范围内
    close = Math.max(trendP - expectedRange * 0.5, Math.min(trendP + expectedRange * 0.5, close));

    // 影线：在上/下方随机延伸（上影线 10-50% 范围，下影线同理）
    var bodyTop = Math.max(open, close);
    var bodyBot = Math.min(open, close);
    var upperWick = expectedRange * (0.1 + prng(seed + i * 11 + 111) * 0.4);
    var lowerWick = expectedRange * (0.1 + prng(seed + i * 13 + 222) * 0.4);
    var high = bodyTop + upperWick;
    var low = bodyBot - lowerWick;

    // 成交量：大波动=大成交量，涨跌比例微调
    var bodyRatio = (high - low) / bp;  // 这跟蜡烛的波动率
    var volume = bp * bodyRatio * 200 * (0.5 + prng(seed + i * 17 + 444) * 1.5);

    var dp = bp >= 1 ? 2 : 6;
    k.push({
      time: now - (len - i) * ms,
      open: +open.toFixed(dp),
      high: +high.toFixed(dp),
      low: +low.toFixed(dp),
      close: +close.toFixed(dp),
      volume: +volume.toFixed(2)
    });
  }
  return k;
}

// 简单哈希函数（生成伪随机种子）
function hashStr(s) {
  var h = 0;
  for (var i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// 确定性伪随机数生成器（线性同余）
function prng(seed) {
  var s = seed % 2147483647;
  s = (s * 16807) % 2147483647;
  return (s - 1) / 2147483646;
}

// ========== Toast ==========
function showToast(msg) {
  var el = document.getElementById('global-toast');
  var msgEl = document.getElementById('toast-msg');
  if (el && msgEl) { msgEl.textContent = msg; el.classList.remove('hidden'); }
}
function hideToast() {
  var el = document.getElementById('global-toast');
  if (el) el.classList.add('hidden');
}

// ========== 工具 ==========
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function fmtP(p) { return p >= 1 ? p.toFixed(2) : p >= 0.01 ? p.toFixed(4) : p.toFixed(6); }
function fmtV(v) { return v >= 1e9 ? (v / 1e9).toFixed(2) + 'B' : v >= 1e6 ? (v / 1e6).toFixed(2) + 'M' : v >= 1e3 ? (v / 1e3).toFixed(1) + 'K' : v.toFixed(0); }
function fmtT(t) { return new Date(t).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
function errShow(id, msg) { const e = $(id); if (e) { e.textContent = msg; setTimeout(() => e.textContent = '', 4000); } }

// ========== GitHub Pages Hash 路由 ==========
function getHashPath() {
  return window.location.hash.replace(/^#/, '') || '/en/trade/BTC_USDT';
}

function navTo(path) {
  if (path.startsWith('/en/') || path.startsWith('/zh-') || path.match(/^\/[a-z]{2}\//)) {
    location.hash = '#' + path;
    route(); return;
  }
  const lang = currentLang;
  location.hash = '#' + '/' + lang + path;
  route();
}

function route() {
  const path = getHashPath();

  // 解析 /{lang}/rest 格式
  const m = path.match(/^\/(en|zh-CN|zh-TW|ja|ko|es|ru|fr|de|pt|vi|th)\/(.+)/);
  let lang = null, restPath = path;
  if (m) { lang = m[1]; restPath = '/' + m[2]; }

  // 语言前缀匹配 → 切换语言
  if (lang && lang !== currentLang) {
    currentLang = lang;
    localStorage.setItem('ct_lang', lang);
  }

  // 旧格式重定向 → 当前语言路径
  if (!lang && path.match(/^\/(login|register|trade|wallet|orders)/)) {
    location.hash = '#' + '/' + currentLang + path; return;
  }
  if (!lang && path === '/') {
    location.hash = '#' + '/' + currentLang + '/trade/BTC_USDT'; return;
  }

  // 隐藏所有页面
  $$('.page-auth, .page-trade').forEach(p => p.classList.add('hidden'));

  // 匹配路由
  if (restPath === '/login') { showAuth('login'); applyLang(); return; }
  if (restPath === '/register') { showAuth('register'); applyLang(); return; }
  if (restPath.startsWith('/trade/')) {
    const sym = restPath.split('/trade/')[1].split('_')[0].toUpperCase();
    ST.symbol = sym;
    showTrade(); applyLang(); return;
  }
  if (restPath === '/trade') { showTrade(); applyLang(); return; }
  if (restPath === '/wallet') { showWallet(); applyLang(); return; }
  if (restPath === '/orders') { showOrders(); applyLang(); return; }
  if (restPath === '/invite') { showInvite(); applyLang(); return; }


  // 默认 → 当前语言交易页
  if (ST.token) { location.hash = '#' + '/' + currentLang + '/trade/BTC_USDT'; return; }
  location.hash = '#' + '/' + currentLang + '/login'; return;
}

// ========== 展示页面 ==========
function showAuth(tab) {
  var pageId = tab === 'register' ? 'page-register' : 'page-login';
  $(pageId).classList.remove('hidden');
  updateNavAuth(false);
  highlightNav('');
  document.title = (tab === 'register' ? t('register') : t('login')) + ' | CoinTrade Pro';
  if (tab === 'register') {
    $('reg-step1').classList.remove('hidden');
    $('reg-step2').classList.add('hidden');
    $('reg-username').value = '';
    $('reg-email').value = '';
    $('reg-password').value = '';
    $('reg-code').value = '';
    $('reg-invite').value = '';
    $('reg-error').textContent = '';
    $('reg-error2').textContent = '';
    // 读取 URL 中的推荐码
    var params = new URLSearchParams(window.location.search);
    var ref = params.get('ref');
    if (ref) $('reg-invite').value = ref;
  }
}

let tradeStarted = false;

function showTrade() {
  $('page-trade').classList.remove('hidden');
  updateNavAuth(!!ST.token);
  highlightNav('/trade');
  document.title = ST.symbol + '/USDT | CoinUSDT C2C';

  // 更新 subnav 高亮
  $$('.subnav-link').forEach(l => l.classList.toggle('active', l.dataset.sym === ST.symbol));

  if (!tradeStarted) {
    tradeStarted = true;
    enterTrade();
  } else {
    // 切换交易对时强制刷新
    klineLoading = false;
    updateAll();
  }
  // 确保翻译在重绘后生效
  setTimeout(function(){applyLang()}, 200);}

function showWallet() {
  if (!ST.token) { location.hash = '#' + '/' + currentLang + '/login'; return; }
  $$('.page-auth,.page-trade,.page-generic').forEach(function(p){ p.classList.add('hidden'); });
  $('page-wallet').classList.remove('hidden');
  updateNavAuth(true);
  highlightNav('/wallet');
  document.title = t('assets') + ' | CoinTrade Pro';
  loadWalletPage();
  setTimeout(function(){applyLang()}, 100);
}

function showOrders() {
  if (!ST.token) { location.hash = '#' + '/' + currentLang + '/login'; return; }
  $$('.page-auth,.page-trade,.page-generic').forEach(function(p){ p.classList.add('hidden'); });
  $('page-orders').classList.remove('hidden');
  updateNavAuth(true);
  highlightNav('/orders');
  document.title = t('orders') + ' | CoinUSDT C2C';
  loadOrdersPage();
  setTimeout(function(){applyLang()}, 100);
}

async function loadWalletPage() {
  try {
    var d = await api.get('/api/auth/me');
    var u = d.user; var assets = d.assets || [];
    $('w-page-usdt').textContent = u.usdt_balance.toFixed(2);
    var total = u.usdt_balance || 0;
    var rows = '';
    assets.forEach(function(a){
      var p = (ST.prices[a.symbol] || {}).price || 0;
      var v = a.balance * p;
      total += v;
      rows += '<tr style="border-bottom:1px solid var(--border)">'
        + '<td style="padding:8px;font-weight:600">' + a.symbol + '</td>'
        + '<td style="padding:8px;text-align:right;font-family:var(--mono)">' + a.balance.toFixed(6) + '</td>'
        + '<td style="padding:8px;text-align:right;font-family:var(--mono)">$' + fmtP(p) + '</td>'
        + '<td style="padding:8px;text-align:right;font-family:var(--mono);color:var(--gold)">$' + v.toFixed(2) + '</td>'
        + '</tr>';
    });
    if (!rows) rows = '<tr><td colspan="4" style="padding:24px;text-align:center;color:var(--text2)" data-i18n="no_data">' + t('no_data') + '</td></tr>';
    $('w-assets-body').innerHTML = rows;
    $('w-page-total').textContent = total.toFixed(2);
    $('w-deposit-btn').onclick = openDeposit;
  } catch(e){ console.error(e); }
}

async function loadOrdersPage() {
  try {
    var d = await api.get('/api/trade/orders?limit=50');
    var rows = '';
    (d.orders || []).forEach(function(o){
      rows += '<tr style="border-bottom:1px solid var(--border)">'
        + '<td style="padding:6px 8px;font-size:11px;color:var(--text2)">' + fmtT(o.created_at) + '</td>'
        + '<td style="padding:6px 8px">' + o.symbol + '/USDT</td>'
        + '<td style="padding:6px 8px;color:' + (o.side==='buy'?'#0ECB81':'#F6465D') + '">' + t(o.side) + '</td>'
        + '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">$' + fmtP(o.price) + '</td>'
        + '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">' + o.amount.toFixed(6) + '</td>'
        + '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">$' + o.total.toFixed(2) + '</td>'
        + '<td style="padding:6px 8px;color:var(--text2)">' + t(o.type || o.order_type || 'market') + '</td>'
        + '<td style="padding:6px 8px;color:' + (o.status==='filled'?'#0ECB81':o.status==='cancelled'?'#F6465D':'#F0B90B') + '">' + t(o.status) + '</td>'
        + '</tr>';
    });
    if (!rows) rows = '<tr><td colspan="8" style="padding:24px;text-align:center;color:var(--text2)" data-i18n="no_data">' + t('no_data') + '</td></tr>';
    $('o-orders-body').innerHTML = rows;
  } catch(e){ console.error(e); }
}

function showInvite() {
  if (!ST.token) { location.hash = '#' + '/' + currentLang + '/login'; return; }
  $$('.page-auth,.page-trade,.page-generic').forEach(function(p){ p.classList.add('hidden'); });
  $('page-invite').classList.remove('hidden');
  updateNavAuth(true);
  highlightNav('');
  loadInvitePage();
  setTimeout(function(){applyLang()}, 100);
}

async function loadInvitePage() {
  try {
    var d = await api.get('/api/auth/invite-stats');
    $('inv-code-display').textContent = d.invite_code || '--------';
    $('inv-count').textContent = d.invited_count || 0;
    var rows = '';
    (d.invited_users || []).forEach(function(u){
      rows += '<tr style="border-bottom:1px solid var(--border)">'
        + '<td style="padding:6px 8px;font-weight:600">' + u.username + '</td>'
        + '<td style="padding:6px 8px;color:var(--text2);font-size:12px">' + fmtT(u.created_at) + '</td>'
        + '</tr>';
    });
    if (!rows) rows = '<tr><td colspan="2" style="padding:16px;text-align:center;color:var(--text2)" data-i18n="no_data">' + t('no_data') + '</td></tr>';
    $('inv-users-body').innerHTML = rows;
  } catch(e){ console.error(e); }
}

function copyInviteCode() {
  var code = $('inv-code-display').textContent;
  if (!code || code === '--------') return;
  var link = window.location.origin + '/' + currentLang + '/register?ref=' + code;
  navigator.clipboard.writeText(link).then(function(){
    showToast(t('invite_link_copied'));
  }).catch(function(){
    showToast(t('copy_failed'));
  });
}

function updateNavAuth(loggedIn) {
  $('nav-guest').classList.toggle('hidden', loggedIn);
  $('nav-user').classList.toggle('hidden', !loggedIn);
  if (loggedIn && ST.user) {
    $('nav-username').textContent = ST.user.username;
    $('nav-user-avatar').textContent = ST.user.username[0].toUpperCase();
    updateNavBalance();
  }
}

function highlightNav(currentPath) {
  $$('.nav-link').forEach(l => {
    const lp = l.dataset.path;
    l.classList.toggle('active', lp && currentPath.startsWith(lp));
  });
}

async function updateNavBalance() {
  try {
    const d = await api.get('/api/wallet/balance');
    $('nav-balance').textContent = d.usdt_balance.toFixed(2) + ' USDT';
  } catch (e) {
    if (ST.user) $('nav-balance').textContent = (ST.user.usdt_balance || 0).toFixed(2) + ' USDT';
  }
}

// ========== 认证 ==========
async function login() {
  const u = $('login-username').value.trim(), p = $('login-password').value;
  if (!u || !p) return errShow('login-error', '请输入用户名和密码');
  try {
    const d = await api.post('/api/auth/login', { username: u, password: p });
    saveAuth(d);
    location.hash = '#' + '/' + currentLang + '/trade/BTC_USDT';
  } catch (e) {
    // GitHub Pages 离线模式：本地注册/登录
    offlineLogin(u);
  }
}

function offlineLogin(username) {
  var token = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2);
  var user = {
    username: username,
    usdt_balance: 100000,
    created_at: new Date().toISOString()
  };
  saveAuth({ token: token, user: user });
  location.hash = '#' + '/' + currentLang + '/trade/BTC_USDT';
}

async function register() {
  var u = $('reg-username').value.trim(), e = $('reg-email').value.trim(), p = $('reg-password').value, inv = $('reg-invite').value.trim();
  if (!u || !p) return errShow('reg-error', t('fill_all_fields'));
  if (!e || !e.includes('@')) return errShow('reg-error', t('invalid_email'));
  if (u.length < 3) return errShow('reg-error', t('username_too_short'));
  if (p.length < 6) return errShow('reg-error', t('password_too_short'));
  try {
    var body = { username: u, email: e, password: p };
    if (inv) body.invite_code = inv;
    var d = await api.post('/api/auth/send-code', body);
    // 显示验证码（模拟邮件/短信发送）
    showToast(d.message + '\nCode: ' + d.code);
    $('reg-step1').classList.add('hidden');
    $('reg-step2').classList.remove('hidden');
    $('reg-error').textContent = '';
  } catch (err) {
    // GitHub Pages 离线模式：跳过验证码，直接注册
    offlineLogin(u);
  }
}

async function verifyAndRegister() {
  var code = $('reg-code').value.trim();
  if (!code || code.length !== 6) return errShow('reg-error2', t('enter_verify_code'));
  try {
    var d = await api.post('/api/auth/verify-code', { code: code });
    saveAuth(d);
    location.href = '/' + currentLang + '/trade/BTC_USDT';
  } catch (err) { errShow('reg-error2', err.message); }
}

function backToRegStep1() {
  $('reg-step2').classList.add('hidden');
  $('reg-step1').classList.remove('hidden');
  $('reg-code').value = '';
  $('reg-error2').textContent = '';
}

function saveAuth(d) {
  ST.token = d.token; ST.user = d.user;
  localStorage.setItem('ct_token', d.token);
  localStorage.setItem('ct_user', JSON.stringify(d.user));
}

function logout() {
  ST.token = null; ST.user = null;
  localStorage.removeItem('ct_token'); localStorage.removeItem('ct_user');
  ST.timers.forEach(clearInterval); ST.timers = [];
  $('nav-dropdown').classList.add('hidden');
  location.href = '/' + currentLang + '/login';
}

// ========== 钱包地址生成 ==========
function randomHex(n) { return Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join(''); }
function randomBase58(len) {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
function genAddress(coin) {
  if (coin === 'BTC') return '1' + randomBase58(33);
  if (coin === 'ETH') return '0x' + randomHex(40);
  if (coin === 'USDT') return 'T' + randomBase58(33);
  return '0x' + randomHex(40);
}

// ========== 二维码绘制 ==========
function drawQR(text) {
  const canvas = $('deposit-qr');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 180, modules = 25, cell = size / modules;
  const quiet = cell * 2; // 留白

  // 白底
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);

  // 用文本哈希作为种子生成模块图案
  let seed = 0;
  for (let i = 0; i < text.length; i++) seed = ((seed << 5) - seed + text.charCodeAt(i)) | 0;

  // 定位图案（三个角）
  function drawFinder(x, y) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, cell * 7, cell * 7);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + cell, y + cell, cell * 5, cell * 5);
    ctx.fillStyle = '#000';
    ctx.fillRect(x + cell * 2, y + cell * 2, cell * 3, cell * 3);
  }
  drawFinder(quiet, quiet);
  drawFinder(quiet + cell * (modules - 7), quiet);
  drawFinder(quiet, quiet + cell * (modules - 7));

  // 数据区
  let rng = seed;
  function nextRand() { rng = (rng * 1103515245 + 12345) & 0x7fffffff; return (rng >> 16) & 1; }

  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      // 跳过定位图案
      const inFinder = (r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8);
      if (inFinder) continue;

      if (nextRand()) {
        ctx.fillStyle = '#000';
        ctx.fillRect(quiet + c * cell, quiet + r * cell, cell, cell);
      }
    }
  }
}

// ========== 充值流程 ==========
let depositCoin = 'USDT', depositNetwork = 'TRC20';

function openDeposit() {
  $('deposit-modal').classList.remove('hidden');
  $('deposit-step1').classList.remove('hidden');
  $('deposit-step2').classList.add('hidden');
  $('deposit-title').textContent = '充值';
  $('deposit-amount').value = '';
  $('deposit-error').textContent = '';
  $('deposit-step2-error').textContent = '';

  // 重置币种选择
  $$('.coin-option').forEach(o => {
    o.classList.toggle('active', o.dataset.coin === 'USDT');
  });
  depositCoin = 'USDT';
  depositNetwork = 'TRC20';
}

function closeDeposit() {
  $('deposit-modal').classList.add('hidden');
}

function showDepositStep2() {
  const amt = parseFloat($('deposit-amount').value);
  if (!amt || amt <= 0) return errShow('deposit-error', '请输入有效金额');

  $('deposit-title').textContent = '充值 ' + depositCoin;
  $('deposit-step1').classList.add('hidden');
  $('deposit-step2').classList.remove('hidden');

  // 生成地址
  const addr = genAddress(depositCoin);
  $('deposit-address').textContent = addr;
  $('deposit-network').textContent = depositNetwork;
  $('deposit-summary').textContent = amt + ' ' + depositCoin;

  // 画二维码
  setTimeout(() => drawQR(addr), 50);
}

function backDepositStep1() {
  $('deposit-title').textContent = '充值';
  $('deposit-step2').classList.add('hidden');
  $('deposit-step1').classList.remove('hidden');
}

function copyAddress() {
  const addr = $('deposit-address').textContent;
  if (!addr || addr === '--') return;
  navigator.clipboard.writeText(addr).then(() => {
    const btn = $('copy-addr');
    btn.textContent = '已复制';
    setTimeout(() => btn.textContent = '复制', 2000);
  }).catch(function(){ showToast(t('copy_failed')); });
}

async function confirmDeposit() {
  const amt = parseFloat($('deposit-amount').value);
  if (!amt || amt <= 0) return errShow('deposit-step2-error', '金额无效');

  try {
    const d = await api.post('/api/auth/deposit', { amount: amt });
    // 用前端翻译，不用后端消息
    var msg = t('deposit_request_submitted').replace('{amount}', amt);
    showToast(msg);
    closeDeposit();
  } catch (e) {
    // GitHub Pages 离线模式：直接加余额
    if (ST.user) {
      ST.user.usdt_balance = (ST.user.usdt_balance || 0) + amt;
      localStorage.setItem('ct_user', JSON.stringify(ST.user));
    }
    showToast(t('deposit_request_submitted').replace('{amount}', amt));
    closeDeposit();
  }
}

// ========== 进入交易 ==========
function enterTrade() {
  ST.timers.push(setInterval(updateAll, 3000));
  updateAll();
}

async function updateAll() {
  // 优先从币安获取实时行情
  try {
    const d = await fetchBinancePrices();
    ST.prices = d.prices;
    $('price-status').textContent = '实时';
    $('price-status').style.color = '#0ECB81';
  } catch (e) {
    // 降级：用模拟数据
    var fb = genFallbackPrices();
    ST.prices = fb.prices;
    $('price-status').textContent = '模拟';
    $('price-status').style.color = '#F0B90B';
  }
  renderMarket();
  updateStat();
  updateOrderbook();
  updateTradeTotal();
  updateTradeInfo();
  updateNavBalance();
  loadKline();
  fetchWallet();
  fetchPending();
  fetchOrders();
}

// ========== 行情列表 ==========
function renderMarket() {
  const ctr = $('market-list');
  const search = ($('market-search').value || '').toUpperCase();
  let syms = Object.keys(ST.prices);
  if (search) syms = syms.filter(s => s.includes(search) || (ST.prices[s].name || '').toUpperCase().includes(search));

  if (ST.sortKey === 'vol') syms.sort((a, b) => (ST.prices[b].volume24h || 0) - (ST.prices[a].volume24h || 0));
  else if (ST.sortKey === 'name') syms.sort();
  else if (ST.sortKey === 'change') syms.sort((a, b) => (ST.prices[b].change24h || 0) - (ST.prices[a].change24h || 0));

  const sel = ST.symbol;
  ctr.innerHTML = syms.map(s => {
    const p = ST.prices[s];
    const cl = p.change24h >= 0 ? 'up' : 'down';
    const sg = p.change24h >= 0 ? '+' : '';
    return `<div class="market-row${s === sel ? ' selected' : ''}" data-sym="${s}">
      <span class="sym">${s}</span><span class="price">${fmtP(p.price)}</span>
      <span class="change ${cl}">${sg}${p.change24h.toFixed(2)}%</span></div>`;
  }).join('');

  ctr.querySelectorAll('.market-row').forEach(r => {
    r.addEventListener('click', function(){
      ST.symbol = this.dataset.sym;
      $('stat-symbol').textContent = ST.symbol + '/USDT';
      $('trade-sym').textContent = ST.symbol;
      $$('.subnav-link').forEach(function(l){ l.classList.toggle('active', l.dataset.sym === ST.symbol); });
      $$('.market-row').forEach(function(x){ x.classList.remove('selected'); });
      this.classList.add('selected');
      // 刷新该币统计+订单簿+K线
      updateStat();
      updateOrderbook();
      updateTradeTotal();
      updateTradeInfo();
      // 放开 K线锁并强制重新加载
      klineLoading = false;
      loadKline();
    });
  });
}

// ========== 统计 ==========
function updateStat() {
  const p = ST.prices[ST.symbol]; if (!p) return;
  const chg = p.change24h, cl = chg >= 0 ? 'up' : 'down', sg = chg >= 0 ? '+' : '';
  $('stat-symbol').textContent = ST.symbol + '/USDT';
  $('stat-price').textContent = fmtP(p.price);
  $('stat-change').textContent = sg + chg.toFixed(2) + '%';
  $('stat-change').className = 'stat-change ' + cl;
  $('stat-high').textContent = fmtP(p.high24h || p.price * 1.05);
  $('stat-low').textContent = fmtP(p.low24h || p.price * 0.95);
  $('stat-volume').textContent = '$' + (p.volume24h ? fmtV(p.volume24h) : '0');
  // 更新统计标签（24h 高/低/Vol）
  const statLabels = document.querySelectorAll('.stat-row span:first-child');
  if (statLabels[0]) statLabels[0].textContent = t('24h_high');
  if (statLabels[1]) statLabels[1].textContent = t('24h_low');
  if (statLabels[2]) statLabels[2].textContent = t('24h_vol');
}

// ========== K线 ==========
let klineLoading = false;
let klineTimeout = null;
async function loadKline() {
  if (klineLoading) return;
  klineLoading = true;
  // 5秒超时自动解锁
  clearTimeout(klineTimeout);
  klineTimeout = setTimeout(function(){ klineLoading = false; }, 5000);
  const loading = $('chart-loading');
  if (loading) loading.classList.remove('hidden');
  try {
    ST.klines = await getKlines(ST.symbol, ST.interval);
    drawChart();
  } catch (e) {
    console.error('Kline load error:', e);
    ST.klines = genFallbackKlines(ST.symbol, ST.interval);
    var srcEl2 = $('chart-source');
    if (srcEl2) srcEl2.textContent = 'Simulated';
    drawChart();
  } finally {
    if (loading) loading.classList.add('hidden');
    klineLoading = false;
    clearTimeout(klineTimeout);
  }
}

function _genEmergencyKlines() {
  // 降级到 genFallbackKlines 使用统一随机游走算法
  ST.prices = ST.prices || {};
  if (!ST.prices[ST.symbol]) {
    ST.prices[ST.symbol] = { price: BASE_PRICES[ST.symbol] || 10, change24h: 0 };
  }
  return genFallbackKlines(ST.symbol, ST.interval || '1h');
}

function drawChart() {
  const canvas = $('price-chart');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';

  // 同步 crosshair canvas 尺寸并清空
  var cc = document.getElementById('chart-crosshair');
  if (cc) {
    cc.width = rect.width * dpr;
    cc.height = rect.height * dpr;
    cc.style.width = rect.width + 'px';
    cc.style.height = rect.height + 'px';
    cc.getContext('2d').clearRect(0, 0, cc.width, cc.height);
  }

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;
  const pad = { top: 15, right: 65, bottom: 40, left: 10 };
  const pw = W - pad.left - pad.right, ph = H - pad.top - pad.bottom;
  if (!ST.klines.length) return;

  const volH = 40, chartH = ph - volH - 4;
  const highs = ST.klines.map(k => k.high), lows = ST.klines.map(k => k.low);
  const maxP = Math.max(...highs), minP = Math.min(...lows), range = maxP - minP || 1;
  const maxV = Math.max(...ST.klines.map(k => k.volume)) || 1;

  // 背景
  ctx.fillStyle = '#1A1E26';
  ctx.fillRect(0, 0, W, H);

  // 网格 (6条水平线 + 价格)
  const gridLines = 6;
  ctx.textAlign = 'right';
  for (let i = 0; i < gridLines; i++) {
    const y = pad.top + (chartH / (gridLines - 1)) * i;
    ctx.strokeStyle = i === 0 || i === gridLines - 1 ? 'rgba(43,49,57,0.8)' : 'rgba(43,49,57,0.35)';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right + 5, y); ctx.stroke();
    ctx.fillStyle = '#848E9C'; ctx.font = '11px -apple-system,sans-serif';
    ctx.fillText(fmtP(maxP - (range / (gridLines - 1)) * i), W - 4, y + 4);
  }

  // X轴时间标签
  const step = Math.max(1, Math.floor(ST.klines.length / 6));
  ctx.textAlign = 'center';
  for (let i = 0; i < ST.klines.length; i += step) {
    const x = pad.left + (pw / (ST.klines.length - 1)) * i;
    const d = new Date(ST.klines[i].time);
    const label = ['1d', '1w'].includes(ST.interval)
      ? `${d.getMonth() + 1}/${d.getDate()}`
      : `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    ctx.fillStyle = '#5E6673'; ctx.font = '10px -apple-system,sans-serif';
    ctx.fillText(label, x, pad.top + chartH + 16);
  }

  // 底部X轴线
  ctx.strokeStyle = 'rgba(43,49,57,0.6)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(pad.left, pad.top + chartH); ctx.lineTo(W - pad.right, pad.top + chartH); ctx.stroke();

  // K线 - 最小宽度3px
  const cw = Math.max(3, (pw / ST.klines.length) * 0.75);
  ST.klines.forEach((k, i) => {
    const x = pad.left + (pw / (ST.klines.length - 1)) * i;
    const oy = pad.top + chartH * (1 - (k.open - minP) / range);
    const cy = pad.top + chartH * (1 - (k.close - minP) / range);
    const hy = pad.top + chartH * (1 - (k.high - minP) / range);
    const ly = pad.top + chartH * (1 - (k.low - minP) / range);
    const up = k.close >= k.open;
    const bt = Math.min(oy, cy), bh = Math.max(1, Math.abs(cy - oy));

    // 影线
    ctx.strokeStyle = up ? '#0ECB81' : '#F6465D'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, hy); ctx.lineTo(x, bt); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, Math.max(bt + bh, bt)); ctx.lineTo(x, ly); ctx.stroke();

    // 实体（涨绿跌红，平盘空心）
    if (bh < 1) {
      ctx.strokeStyle = '#848E9C'; ctx.lineWidth = 1;
      ctx.strokeRect(x - cw / 2, bt - 0.5, cw, 2);
    } else {
      ctx.fillStyle = up ? '#0ECB81' : '#F6465D';
      ctx.fillRect(x - cw / 2, bt, cw, bh);
    }
  });

  // 分割线
  ctx.strokeStyle = 'rgba(43,49,57,0.6)'; ctx.lineWidth = 1;
  const volTop = pad.top + chartH + 4;
  ctx.beginPath(); ctx.moveTo(pad.left, volTop); ctx.lineTo(W - pad.right, volTop); ctx.stroke();

  // 成交量柱
  ST.klines.forEach((k, i) => {
    const x = pad.left + (pw / (ST.klines.length - 1)) * i;
    const vh = Math.max(1, (k.volume / maxV) * volH);
    ctx.fillStyle = k.close >= k.open ? 'rgba(14,203,129,0.35)' : 'rgba(246,70,93,0.35)';
    ctx.fillRect(x - cw / 2, volTop + volH - vh, cw, vh);
  });

  // 存储柱体位置供鼠标交互使用
  chartMeta = {
    W: W, H: H, pad: pad, pw: pw, ph: ph, chartH: chartH, volH: volH, volTop: volTop,
    maxP: maxP, minP: minP, range: range, maxV: maxV, cw: cw,
    candles: ST.klines.map(function(k, i) {
      return {
        x: pad.left + (pw / (ST.klines.length - 1)) * i,
        k: k
      };
    })
  };
}

// ========== K线图鼠标交互 (十字光标 + 浮动提示) ==========
var chartMeta = null;
var chartHoverId = -1;

function initChartInteraction() {
  var canvas = document.getElementById('price-chart');
  var cc = document.getElementById('chart-crosshair');
  var tip = document.getElementById('chart-tooltip');
  if (!canvas || !cc || !tip) return;

  function syncCrosshairSize() {
    if (!chartMeta) return;
    var dpr = window.devicePixelRatio || 1;
    cc.width = chartMeta.W * dpr;
    cc.height = chartMeta.H * dpr;
    cc.style.width = chartMeta.W + 'px';
    cc.style.height = chartMeta.H + 'px';
  }

  function drawCrosshair(idx, mouseY) {
    if (!chartMeta || idx < 0 || idx >= chartMeta.candles.length) {
      cc.getContext('2d').clearRect(0, 0, cc.width, cc.height);
      return;
    }
    syncCrosshairSize();
    var ctx = cc.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, chartMeta.W, chartMeta.H);

    var c = chartMeta.candles[idx];
    var x = c.x;
    var pad = chartMeta.pad;
    var chartH = chartMeta.chartH;
    var volTop = chartMeta.volTop;
    var volH = chartMeta.volH;
    var y = mouseY;

    // 竖线 - 半透明灰白
    ctx.strokeStyle = 'rgba(132,142,156,0.25)';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(x, pad.top);
    ctx.lineTo(x, volTop + volH);
    ctx.stroke();
    ctx.setLineDash([]);

    // 横线 - 只画在K线区域
    var crossY = Math.max(pad.top, Math.min(pad.top + chartH, y));
    ctx.strokeStyle = 'rgba(132,142,156,0.35)';
    ctx.beginPath();
    ctx.moveTo(pad.left, crossY);
    ctx.lineTo(chartMeta.W - pad.right, crossY);
    ctx.stroke();

    // 横线价格标签 - 右侧
    var priceAtY = chartMeta.maxP - ((crossY - pad.top) / chartH) * chartMeta.range;
    var dp = ST.prices[ST.symbol]?.price >= 1 ? 2 : 6;
    ctx.fillStyle = '#1A1E26';
    ctx.fillRect(chartMeta.W - pad.right + 2, crossY - 9, 58, 18);
    ctx.strokeStyle = 'rgba(132,142,156,0.5)';
    ctx.strokeRect(chartMeta.W - pad.right + 2, crossY - 9, 58, 18);
    ctx.fillStyle = '#F0B90B';
    ctx.font = 'bold 10px Cascadia Code, Consolas, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(fmtP(priceAtY), chartMeta.W - 4, crossY + 4);

    // 时间标签 - 底部
    var d = new Date(c.k.time);
    var tLabel = ['1d', '1w'].includes(ST.interval)
      ? (d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate())
      : (String(d.getMonth()+1).padStart(2,'0') + '/' + String(d.getDate()).padStart(2,'0') + ' ' +
         String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'));
    ctx.fillStyle = '#1A1E26';
    var tw = 130;
    ctx.fillRect(x - tw/2, volTop + volH + 2, tw, 16);
    ctx.fillStyle = '#848E9C';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(tLabel, x, volTop + volH + 14);

    ctx.restore();
  }

  function showTooltip(idx, evt) {
    if (!chartMeta || idx < 0 || idx >= chartMeta.candles.length) {
      tip.classList.add('hidden');
      return;
    }
    var c = chartMeta.candles[idx];
    var k = c.k;
    var dp = ST.prices[ST.symbol]?.price >= 1 ? 2 : 6;
    var up = k.close >= k.open;
    var change = ((k.close - k.open) / k.open * 100).toFixed(2);

    var d = new Date(k.time);
    var tLabel = ['1d', '1w'].includes(ST.interval)
      ? (d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate())
      : (String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0') + ' ' +
         String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0'));

    tip.innerHTML =
      '<div class="tt-time">' + tLabel + '  <span style="color:' + (up ? '#0ECB81' : '#F6465D') + '">' + (up ? '+' : '') + change + '%</span></div>' +
      '<div class="tt-row"><span class="tt-label">' + t('ohlc_open') + '</span><span class="tt-open">' + k.open.toFixed(dp) + '</span></div>' +
      '<div class="tt-row"><span class="tt-label">' + t('ohlc_high') + '</span><span class="tt-high">' + k.high.toFixed(dp) + '</span></div>' +
      '<div class="tt-row"><span class="tt-label">' + t('ohlc_low') + '</span><span class="tt-low">' + k.low.toFixed(dp) + '</span></div>' +
      '<div class="tt-row"><span class="tt-label">' + t('ohlc_close') + '</span><span class="tt-close">' + k.close.toFixed(dp) + '</span></div>' +
      '<div class="tt-vol">VOL ' + formatVol(k.volume) + '</div>';

    tip.classList.remove('hidden');

    // 定位 — 偏右避开手指
    var rect = canvas.getBoundingClientRect();
    var tx = evt.clientX - rect.left + 20;
    var ty = evt.clientY - rect.top - 10;
    if (tx + 140 > rect.width) tx = evt.clientX - rect.left - 150;
    tip.style.left = tx + 'px';
    tip.style.top = ty + 'px';
  }

  function hideAll() {
    if (cc) { var c2 = cc.getContext('2d'); c2.clearRect(0, 0, cc.width, cc.height); }
    if (tip) tip.classList.add('hidden');
    chartHoverId = -1;
  }

  canvas.addEventListener('mousemove', function(e) {
    if (!chartMeta || !chartMeta.candles.length) { hideAll(); return; }
    var rect = canvas.getBoundingClientRect();
    var mx = e.clientX - rect.left;
    var my = e.clientY - rect.top;

    // 找最近的蜡烛
    var candles = chartMeta.candles;
    var best = 0;
    var bestDist = Math.abs(candles[0].x - mx);
    for (var i = 1; i < candles.length; i++) {
      var d = Math.abs(candles[i].x - mx);
      if (d < bestDist) { bestDist = d; best = i; }
    }

    // 限制在K线价格区域内
    if (mx >= chartMeta.pad.left && mx <= chartMeta.W - chartMeta.pad.right &&
        my >= chartMeta.pad.top && my <= chartMeta.pad.top + chartMeta.chartH + chartMeta.volH) {
      chartHoverId = best;
      drawCrosshair(best, my);
      showTooltip(best, e);
    } else {
      hideAll();
    }
  });

  canvas.addEventListener('mouseleave', hideAll);
  canvas.addEventListener('mouseout', function(e) {
    if (!e.relatedTarget || !canvas.contains(e.relatedTarget)) hideAll();
  });

  // 触摸支持
  canvas.addEventListener('touchmove', function(e) {
    if (!chartMeta || !chartMeta.candles.length) return;
    var rect = canvas.getBoundingClientRect();
    var mx = e.touches[0].clientX - rect.left;
    var my = e.touches[0].clientY - rect.top;
    var candles = chartMeta.candles;
    var best = 0, bestDist = Math.abs(candles[0].x - mx);
    for (var i = 1; i < candles.length; i++) {
      var d = Math.abs(candles[i].x - mx);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    if (mx >= chartMeta.pad.left && mx <= chartMeta.W - chartMeta.pad.right) {
      drawCrosshair(best, my);
      showTooltip(best, e.touches[0]);
    }
  });
  canvas.addEventListener('touchend', hideAll);
}

function formatVol(v) {
  if (v >= 1e9) return (v / 1e9).toFixed(2) + 'B';
  if (v >= 1e6) return (v / 1e6).toFixed(2) + 'M';
  if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K';
  return v.toFixed(2);
}

// ========== 订单簿 ==========
async function updateOrderbook() {
  try {
    var d = await fetchBinanceDepth(ST.symbol);
    ST.orderbook = d;
    renderOrderbook(d);
  } catch (e) {
    var fb = genFallbackOrderbook(ST.symbol);
    ST.orderbook = fb;
    renderOrderbook(fb);
  }
}
function renderOrderbook(d) {
    const ms = Math.max(...d.asks.map(a => a[1]), ...d.bids.map(b => b[1]), 1);

    $('ob-asks').innerHTML = d.asks.slice(0, 10).reverse().map(a =>
      `<div class="ob-row ask"><div class="bar" style="width:${(a[1] / ms * 100).toFixed(1)}%"></div>
      <span>${fmtP(a[0])}</span><span>${a[1].toFixed(4)}</span><span>${a[1].toFixed(4)}</span></div>`
    ).join('');

    $('ob-bids').innerHTML = d.bids.slice(0, 10).map(b =>
      `<div class="ob-row bid"><div class="bar" style="width:${(b[1] / ms * 100).toFixed(1)}%"></div>
      <span>${fmtP(b[0])}</span><span>${b[1].toFixed(4)}</span><span>${b[1].toFixed(4)}</span></div>`
    ).join('');

    const mid = $('ob-mid');
    mid.textContent = fmtP(d.price || d.lastPrice);
    mid.className = 'ob-mid ' + ((ST.prices[ST.symbol]?.change24h || 0) >= 0 ? 'up' : 'down');
    if (d.asks.length && d.bids.length) {
      $('ob-spread').textContent = '价差 ' + fmtP(d.asks[0][0] - d.bids[0][0]);
    }
}

// ========== 交易 ==========
function updateTradeTotal() {
  const p = ST.orderType === 'market' ? (ST.prices[ST.symbol]?.price || 0) : (parseFloat($('trade-price-input').value) || 0);
  const amt = parseFloat($('trade-amount').value) || 0;
  $('trade-total').textContent = (amt * p).toFixed(6) + ' USDT';
  $('trade-fee').textContent = (amt * p * FEE).toFixed(6) + ' USDT';
}

async function updateTradeInfo() {
  try {
    const d = await api.get('/api/auth/profile');
    const a = d.assets.find(x => x.symbol === ST.symbol);
    $('available-usdt').textContent = d.user.usdt_balance.toFixed(2) + ' USDT';
    $('holding-info').textContent = (a ? a.balance.toFixed(6) : '0') + ' ' + ST.symbol;
    if (ST.user) ST.user.usdt_balance = d.user.usdt_balance;
  } catch (e) {
    if (ST.user) {
      $('available-usdt').textContent = (ST.user.usdt_balance || 0).toFixed(2) + ' USDT';
      $('holding-info').textContent = '0 ' + ST.symbol;
    }
  }
}

async function executeTrade() {
  const sym = ST.symbol;
  const price = ST.orderType === 'market' ? (ST.prices[sym]?.price || 0) : (parseFloat($('trade-price-input').value) || 0);
  const amt = parseFloat($('trade-amount').value);
  if (!amt || amt <= 0) return errShow('trade-error', '请输入有效数量');
  if (!price || price <= 0) return errShow('trade-error', '价格无效');

  if (ST.side === 'buy' && ((ST.user?.usdt_balance || 0) <= 0)) {
    return errShow('trade-error', t('USDT 余额不足，请先充值'));
  }

  try {
    const d = await api.post(ST.side === 'buy' ? '/api/trade/buy' : '/api/trade/sell',
      { symbol: sym, amount: amt, price, type: ST.orderType });
    // 翻译交易成功消息
    var side = ST.side === 'buy' ? t('buy') : t('sell');
    showToast(side + ' ' + amt + ' ' + sym + (d.status === 'pending' ? ' (' + t('pending') + ')' : ''));
    $('trade-amount').value = '';
    if (ST.orderType === 'limit') $('trade-price-input').value = '';
    updateTradeTotal(); updateTradeInfo(); updateNavBalance(); fetchWallet(); fetchOrders(); fetchPending();
  } catch (e) {
    // GitHub Pages 离线模式：模拟交易
    var total = amt * price;
    if (ST.user) {
      if (ST.side === 'buy') {
        ST.user.usdt_balance = Math.max(0, (ST.user.usdt_balance || 0) - total);
      } else {
        ST.user.usdt_balance = (ST.user.usdt_balance || 0) + total;
      }
      localStorage.setItem('ct_user', JSON.stringify(ST.user));
    }
    var sideOff = ST.side === 'buy' ? t('buy') : t('sell');
    showToast(sideOff + ' ' + amt + ' ' + sym + ' ✓');
    $('trade-amount').value = '';
    if (ST.orderType === 'limit') $('trade-price-input').value = '';
    updateTradeTotal(); updateTradeInfo(); updateNavBalance();
  }
}

async function fillPct(pct) {
  const sym = ST.symbol;
  if (ST.side === 'buy') {
    const price = ST.orderType === 'market' ? (ST.prices[sym]?.price || 0) : (parseFloat($('trade-price-input').value) || 0);
    if (price > 0) $('trade-amount').value = (((ST.user?.usdt_balance || 0) * 0.999) / price * pct).toFixed(6);
  } else {
    try {
      const d = await api.get('/api/auth/profile');
      const a = d.assets.find(x => x.symbol === sym);
      if (a) $('trade-amount').value = (a.balance * pct).toFixed(6);
    } catch (e) { /* ignore */ }
  }
  updateTradeTotal();
}

// ========== 钱包 ==========
async function fetchWallet() {
  try {
    const d = await api.get('/api/wallet/balance');
    $('wallet-usdt').textContent = d.usdt_balance.toFixed(2);
    $('wallet-total').textContent = d.total_value.toFixed(2);
    const c = $('wallet-assets');
    if (!d.assets.length) { c.innerHTML = '<div class="empty-hint">暂无持仓</div>'; return; }
    c.innerHTML = d.assets.map(a =>
      `<div class="asset-row"><span class="asset-sym">${a.symbol}</span><span class="asset-bal">${a.balance.toFixed(4)}</span><span class="asset-val">@${fmtP(a.avg_price)}</span></div>`
    ).join('');
  } catch (e) {
    // GitHub Pages 离线模式
    if (ST.user) {
      $('wallet-usdt').textContent = (ST.user.usdt_balance || 0).toFixed(2);
      $('wallet-total').textContent = (ST.user.usdt_balance || 0).toFixed(2);
    }
  }
}

// ========== 订单 ==========
async function fetchOrders() {
  try {
    const d = await api.get('/api/trade/orders?limit=30&status=filled');
    const b = $('orders-body');
    if (!d.orders.length) { b.innerHTML = '<tr><td colspan="8" class="empty-hint">暂无订单</td></tr>'; }
    else b.innerHTML = d.orders.map(o =>
      `<tr><td>${fmtT(o.created_at)}</td><td>${o.symbol}/USDT</td>
      <td class="side-${o.side}">${o.side === 'buy' ? '买入' : '卖出'}</td>
      <td>${fmtP(o.price)}</td><td>${o.amount.toFixed(4)}</td><td>${o.total.toFixed(2)}</td>
      <td>${o.type === 'market' ? '市价' : '限价'}</td>
      <td class="status-${o.status}">${o.status === 'filled' ? '已成交' : o.status === 'pending' ? '挂单中' : '已取消'}</td></tr>`
    ).join('');
  } catch (e) { /* ignore */ }

  try {
    const tx = await api.get('/api/wallet/transactions?limit=30');
    const b = $('transactions-body');
    if (!tx.transactions.length) { b.innerHTML = '<tr><td colspan="8" class="empty-hint">暂无记录</td></tr>'; }
    else b.innerHTML = tx.transactions.map(t =>
      `<tr><td>${fmtT(t.created_at)}</td><td>${t.symbol}</td>
      <td class="${t.type === 'deposit' ? 'side-buy' : t.type === 'buy' ? 'side-buy' : t.type === 'sell' ? 'side-sell' : ''}">${t.type === 'deposit' ? '充值' : t.type === 'buy' ? '买入' : '卖出'}</td>
      <td>${fmtP(t.price)}</td><td>${t.amount.toFixed(4)}</td><td>${t.total.toFixed(2)}</td>
      <td>${t.fee.toFixed(4)}</td><td style="font-size:10px">${t.description}</td></tr>`
    ).join('');
  } catch (e) { /* ignore */ }
}

// ========== 挂单 ==========
async function fetchPending() {
  try {
    const d = await api.get('/api/trade/orders?status=pending&limit=20');
    const cnt = d.orders.length;
    $('pending-count').textContent = cnt;
    $('pending-count').classList.toggle('hidden', cnt === 0);
    $('pending-badge').classList.toggle('hidden', cnt === 0);
    $('pending-badge').textContent = cnt + ' 挂单';

    const list = $('pending-list');
    if (!cnt) { list.innerHTML = '<div class="empty-hint">暂无挂单</div>'; return; }
    list.innerHTML = d.orders.map(o =>
      `<div class="pending-item"><span class="p-side ${o.side}">${o.side === 'buy' ? '买' : '卖'}</span>
      <span class="p-info">${o.symbol} ${o.amount} @${fmtP(o.price)}</span>
      <span class="p-time">${fmtT(o.created_at)}</span>
      <button class="btn-cancel" data-id="${o.id}">取消</button></div>`
    ).join('');
    list.querySelectorAll('.btn-cancel').forEach(b => {
      b.addEventListener('click', () => cancelOrder(parseInt(b.dataset.id)));
    });
  } catch (e) { /* ignore */ }
}

async function cancelOrder(id) {
  try {
    await api.post(`/api/trade/orders/${id}/cancel`);
    showToast(t('order_cancelled'));
    updateTradeInfo(); updateNavBalance(); fetchWallet(); fetchPending(); fetchOrders();
  } catch (e) { showToast(e.message); }
}

async function cancelAll() {
  try {
    const d = await api.get('/api/trade/orders?status=pending&limit=50');
    for (const o of d.orders) await api.post(`/api/trade/orders/${o.id}/cancel`);
    showToast(t('all_cancelled'));
    updateTradeInfo(); updateNavBalance(); fetchWallet(); fetchPending(); fetchOrders();
  } catch (e) { showToast(e.message); }
}

// ========== SPA 链接拦截 ==========
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript')) return;
  if (href.startsWith('/api/')) return;
  if (a.target === '_blank' || a.hasAttribute('download')) return;

  e.preventDefault();
  if (href.match(/^\/(en|zh-CN|zh-TW|ja|ko|es|ru|fr|de|pt|vi|th)\//)) {
    location.hash = '#' + href;
    route();
    return;
  }
  navTo(href);
});

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
  // 恢复语言
  applyLang();

  // 点击空白关闭语言下拉
  document.addEventListener('click', function(e){
    if (!e.target.closest('#lang-switch')){
      var d = document.getElementById('lang-drop');
      if (d) d.classList.add('hidden');
    }
  });

  // 初始路由
  route();

  // 浏览器后退/前进
  window.addEventListener('hashchange', route);

  // ===== 认证事件 =====
  $('login-btn').addEventListener('click', login);
  $('reg-btn').addEventListener('click', register);
  $('reg-verify-btn').addEventListener('click', verifyAndRegister);
  $('reg-back-btn').addEventListener('click', backToRegStep1);
  ['login-username', 'login-password', 'reg-username', 'reg-password', 'reg-email'].forEach(function(id) {
    $(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); id.startsWith('reg') ? register() : login(); }
    });
  });

  // ===== 导航 =====
  $('nav-logout').addEventListener('click', e => { e.preventDefault(); logout(); });
  $('nav-user-trigger').addEventListener('click', () => $('nav-dropdown').classList.toggle('hidden'));
  document.addEventListener('click', e => {
    if (!e.target.closest('#nav-user')) $('nav-dropdown').classList.add('hidden');
  });

  // ===== 充值 =====
  $('nav-deposit-btn').addEventListener('click', e => { e.preventDefault(); openDeposit(); $('nav-dropdown').classList.add('hidden'); });
  $('quick-deposit-btn').addEventListener('click', openDeposit);
  $('modal-close').addEventListener('click', closeDeposit);
  $('deposit-modal').addEventListener('click', e => { if (e.target === $('deposit-modal')) closeDeposit(); });

  // 币种选择
  $$('.coin-option').forEach(o => o.addEventListener('click', function () {
    $$('.coin-option').forEach(x => x.classList.remove('active'));
    this.classList.add('active');
    depositCoin = this.dataset.coin;
    depositNetwork = this.dataset.network;
  }));

  // 充值步骤
  $('deposit-next').addEventListener('click', showDepositStep2);
  $('deposit-back').addEventListener('click', backDepositStep1);
  $('deposit-confirm').addEventListener('click', confirmDeposit);
  $('copy-addr').addEventListener('click', copyAddress);
  $$('.deposit-preset').forEach(b => b.addEventListener('click', function () {
    $('deposit-amount').value = this.dataset.amt;
  }));

  // ===== 交易页事件 =====
  $('market-search')?.addEventListener('input', renderMarket);
  $('toggle-sort')?.addEventListener('click', () => {
    const keys = ['vol', 'name', 'change']; ST.sortKey = keys[(keys.indexOf(ST.sortKey) + 1) % 3]; renderMarket();
  });

  // K线周期
  $$('.interval-btn').forEach(b => b.addEventListener('click', function () {
    $$('.interval-btn').forEach(x => x.classList.remove('active'));
    this.classList.add('active'); ST.interval = this.dataset.interval; loadKline();
  }));

  // 订单类型
  $$('.ot-tab').forEach(t => t.addEventListener('click', function () {
    const type = this.dataset.type;
    if (type === 'pending') {
      $$('.ot-tab').forEach(x => x.classList.remove('active')); this.classList.add('active');
      $('pending-panel').classList.remove('hidden');
      $('trade-form-market').style.display = 'none';
      document.querySelector('.trade-tabs').style.display = 'none';
      document.querySelector('.trade-info').style.display = 'none';
      fetchPending(); return;
    }
    $('pending-panel').classList.add('hidden');
    $('trade-form-market').style.display = '';
    document.querySelector('.trade-tabs').style.display = '';
    document.querySelector('.trade-info').style.display = '';

    $$('.ot-tab').forEach(x => x.classList.remove('active')); this.classList.add('active');
    ST.orderType = type;
    $('limit-price-row').style.display = type === 'limit' ? '' : 'none';
    if (type === 'limit' && !$('trade-price-input').value)
      $('trade-price-input').value = ST.prices[ST.symbol]?.price || 0;
    updateTradeTotal();
  }));

  // 买/卖
  $$('.trade-tab').forEach(t => t.addEventListener('click', function () {
    $$('.trade-tab').forEach(x => { x.classList.remove('active', 'buy', 'sell'); });
    this.classList.add('active', this.dataset.side); ST.side = this.dataset.side;
    const btn = $('trade-btn');
    btn.textContent = t(ST.side === 'buy' ? 'buy' : 'sell') + ' ' + ST.symbol;
    btn.className = 'btn btn-full ' + (ST.side === 'buy' ? 'btn-buy' : 'btn-sell');
    $('trade-error').textContent = '';
  }));

  $('trade-amount')?.addEventListener('input', updateTradeTotal);
  $('trade-price-input')?.addEventListener('input', updateTradeTotal);
  $('trade-btn')?.addEventListener('click', executeTrade);
  $$('.quick-pct').forEach(b => b.addEventListener('click', () => fillPct(parseInt(b.dataset.pct) / 100)));

  // 底部面板
  $$('.bottom-tab').forEach(t => t.addEventListener('click', function () {
    $$('.bottom-tab').forEach(x => x.classList.remove('active')); this.classList.add('active');
    const p = this.dataset.panel;
    $('orders-table').classList.toggle('hidden', p !== 'orders');
    $('transactions-table').classList.toggle('hidden', p !== 'transactions');
    if (p === 'orders') fetchOrders();
  }));

  // 取消挂单
  $('cancel-all-btn')?.addEventListener('click', cancelAll);

  // 窗口缩放重绘
  window.addEventListener('resize', () => {
    if (ST.klines.length && !$('page-trade').classList.contains('hidden')) drawChart();
  });

  // 自动登录
  if (ST.token) {
    api.get('/api/auth/profile').then(d => { ST.user = d.user; route(); }).catch(() => {
      ST.token = null; localStorage.removeItem('ct_token'); route();
    });
  }

  // 初始化K线图鼠标交互
  initChartInteraction();
});
