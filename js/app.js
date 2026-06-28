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
d('sim_deposit',{'zh-CN':'真实充值','zh-TW':'真實充值',en:'Deposit',ja:'入金',ko:'입금',es:'Depositar',ru:'Пополнение',fr:'Dépôt',de:'Einzahlung',pt:'Depositar',vi:'Nạp tiền',th:'ฝาก' });
d('deposit_next',{'zh-CN':'下一步','zh-TW':'下一步',en:'Next',ja:'次へ',ko:'다음',es:'Siguiente',ru:'Далее',fr:'Suivant',de:'Weiter',pt:'Próximo',vi:'Tiếp',th:'ถัดไป' });
d('deposit_request_submitted',{'zh-CN':'充值工单已提交，等待客服审核到账','zh-TW':'充值工單已提交，等待客服審核到帳',en:'Deposit request submitted, pending manual review',ja:'入金申請を送信、手動審査待ち',ko:'입금 신청 완료, 수동 승인 대기중',es:'Solicitud enviada, pendiente de revisión manual',ru:'Заявка отправлена, ожидает ручной проверки',fr:'Demande envoyée, en attente de vérification manuelle',de:'Antrag gesendet, manuelle Prüfung ausstehend',pt:'Pedido enviado, aguardando revisão manual',vi:'Đã gửi yêu cầu, chờ duyệt thủ công',th:'ส่งคำขอแล้ว รออนุมัติด้วยตนเอง' });
d('order_cancelled',{'zh-CN':'订单已取消','zh-TW':'訂單已取消',en:'Order cancelled',ja:'注文を取消しました',ko:'주문이 취소되었습니다',es:'Orden cancelada',ru:'Ордер отменён',fr:'Ordre annulé',de:'Order storniert',pt:'Ordem cancelada',vi:'Lệnh đã hủy',th:'คำสั่งถูกยกเลิก' });
d('all_cancelled',{'zh-CN':'已取消所有挂单','zh-TW':'已取消所有掛單',en:'All pending orders cancelled',ja:'全ての待機注文を取消しました',ko:'모든 대기 주문이 취소되었습니다',es:'Todas las órdenes canceladas',ru:'Все ордера отменены',fr:'Tous les ordres annulés',de:'Alle Aufträge storniert',pt:'Todas as ordens canceladas',vi:'Đã hủy tất cả lệnh chờ',th:'ยกเลิกคำสั่งที่รอทั้งหมด' });

// ====== C2C 翻译 ======
d('c2c',          {'zh-CN':'C2C','en':'C2C',ja:'C2C',ko:'C2C'});
d('c2c_trade',    {'zh-CN':'P2P交易','en':'P2P Trade',ja:'P2P取引',ko:'P2P 거래'});
d('c2c_post_ad',  {'zh-CN':'发布广告','en':'Post Ad',ja:'広告掲載',ko:'광고 게시'});
d('c2c_my_orders',{'zh-CN':'我的订单','en':'My Orders',ja:'注文一覧',ko:'내 주문'});
d('c2c_buy_usdt', {'zh-CN':'购买 USDT','en':'Buy USDT',ja:'USDT購入',ko:'USDT 구매'});
d('c2c_sell_usdt',{'zh-CN':'出售 USDT','en':'Sell USDT',ja:'USDT売却',ko:'USDT 판매'});
d('c2c_all_methods',{'zh-CN':'全部支付方式','en':'All Payment Methods',ja:'全支払方法',ko:'모든 결제 수단'});
d('c2c_apply',    {'zh-CN':'筛选','en':'Apply',ja:'適用',ko:'적용'});
d('c2c_ad_type',  {'zh-CN':'交易类型','en':'Type',ja:'種類',ko:'유형'});
d('c2c_coin',     {'zh-CN':'币种','en':'Coin',ja:'通貨',ko:'코인'});
d('c2c_price',    {'zh-CN':'单价 (CNY)','en':'Price (CNY)',ja:'単価 (CNY)',ko:'단가 (CNY)'});
d('c2c_min_amount',{'zh-CN':'最小金额','en':'Min',ja:'最小額',ko:'최소 금액'});
d('c2c_max_amount',{'zh-CN':'最大金额','en':'Max',ja:'最大額',ko:'최대 금액'});
d('c2c_payment_methods',{'zh-CN':'支付方式','en':'Payment Methods',ja:'支払方法',ko:'결제 수단'});
d('c2c_remark',   {'zh-CN':'备注','en':'Remarks',ja:'備考',ko:'비고'});
d('c2c_take_order',{'zh-CN':'下单交易','en':'Trade',ja:'取引',ko:'거래'});
d('c2c_confirm_pay',{'zh-CN':'确认付款','en':'Confirm Payment',ja:'支払確認',ko:'결제 확인'});
d('c2c_release',  {'zh-CN':'释放币','en':'Release',ja:'リリース',ko:'코인 해제'});
d('c2c_cancel_order',{'zh-CN':'取消订单','en':'Cancel',ja:'注文取消',ko:'주문 취소'});
d('c2c_dispute',  {'zh-CN':'申诉','en':'Dispute',ja:'紛争',ko:'분쟁'});
d('c2c_chat_with',{'zh-CN':'与对方聊天','en':'Chat',ja:'チャット',ko:'채팅'});
d('c2c_no_ads',   {'zh-CN':'暂无C2C广告','en':'No C2C ads available',ja:'広告がありません',ko:'광고가 없습니다'});
d('c2c_enter_amount',{'zh-CN':'请输入交易数量','en':'Enter trade amount',ja:'数量を入力',ko:'거래 수량 입력'});
d('c2c_take_confirm',{'zh-CN':'确认购买 {amt} {coin} @ {price} CNY？','en':'Buy {amt} {coin} @ {price} CNY?',ja:'{amt} {coin} @ {price} CNY 購入？',ko:'{amt} {coin} @ {price} CNY 구매？'});

// ====== 新功能翻译 ======
d('withdraw',      {'zh-CN':'提现','en':'Withdraw',ja:'出金',ko:'출금'});
d('withdraw_coin', {'zh-CN':'选择币种','en':'Select Coin',ja:'通貨選択',ko:'코인 선택'});
d('withdraw_addr', {'zh-CN':'提现地址','en':'Withdraw Address',ja:'出金アドレス',ko:'출금 주소'});
d('withdraw_memo', {'zh-CN':'备注/Memo','en':'Memo/Tag',ja:'メモ',ko:'메모'});
d('withdraw_amount',{'zh-CN':'提现金额','en':'Amount',ja:'金額',ko:'금액'});
d('withdraw_network',{'zh-CN':'网络','en':'Network',ja:'ネットワーク',ko:'네트워크'});
d('withdraw_fee_label',{'zh-CN':'手续费','en':'Fee',ja:'手数料',ko:'수수료'});
d('withdraw_receive',{'zh-CN':'实际到账','en':'You receive',ja:'受取額',ko:'수령액'});
d('withdraw_confirm',{'zh-CN':'确认提现','en':'Confirm Withdrawal',ja:'出金確認',ko:'출금 확인'});
d('withdraw_history',{'zh-CN':'提现记录','en':'Withdraw History',ja:'出金履歴',ko:'출금 내역'});
d('stop_limit',    {'zh-CN':'止损限价','en':'Stop-Limit',ja:'ストップ指値',ko:'스탑 지정가'});
d('stop_price',    {'zh-CN':'触发价(USDT)','en':'Trigger Price (USDT)',ja:'トリガー価格',ko:'트리거 가격'});
d('settings',      {'zh-CN':'设置','en':'Settings',ja:'設定',ko:'설정'});
d('profile_settings',{'zh-CN':'个人资料','en':'Profile',ja:'プロフィール',ko:'프로필'});
d('change_pwd',    {'zh-CN':'修改密码','en':'Change Password',ja:'パスワード変更',ko:'비밀번호 변경'});
d('old_pwd',       {'zh-CN':'当前密码','en':'Current Password',ja:'現在のパスワード',ko:'현재 비밀번호'});
d('new_pwd',       {'zh-CN':'新密码','en':'New Password',ja:'新しいパスワード',ko:'새 비밀번호'});
d('save',          {'zh-CN':'保存','en':'Save',ja:'保存',ko:'저장'});
d('phone',         {'zh-CN':'手机号','en':'Phone',ja:'電話番号',ko:'전화번호'});
d('lang_pref',     {'zh-CN':'语言偏好','en':'Language',ja:'言語',ko:'언어'});
d('level',         {'zh-CN':'等级','en':'Level',ja:'レベル',ko:'레벨'});
d('forgot_pwd',    {'zh-CN':'忘记密码','en':'Forgot Password?',ja:'パスワードをお忘れ？',ko:'비밀번호 찾기'});
d('send_reset_code',{'zh-CN':'发送重置验证码','en':'Send Reset Code',ja:'リセットコード送信',ko:'재설정 코드 전송'});
d('reset_pwd',     {'zh-CN':'重置密码','en':'Reset Password',ja:'パスワードリセット',ko:'비밀번호 재설정'});
d('remembered_pwd',{'zh-CN':'想起来了？','en':'Remembered?',ja:'思い出した？',ko:'기억나셨나요?'});
d('review',        {'zh-CN':'评价','en':'Review',ja:'レビュー',ko:'리뷰'});
d('reviews',       {'zh-CN':'条评价','en':'reviews',ja:'レビュー',ko:'리뷰'});
d('submit_review', {'zh-CN':'提交评价','en':'Submit Review',ja:'レビュー提出',ko:'리뷰 제출'});
d('your_rating',   {'zh-CN':'您的评分','en':'Your Rating',ja:'評価',ko:'평점'});
d('review_comment',{'zh-CN':'评价内容(可选)','en':'Comment (optional)',ja:'コメント（任意）',ko:'코멘트 (선택)'});
d('c2c_submit_review',{'zh-CN':'提交评价','en':'Submit Review',ja:'レビュー提出',ko:'리뷰 제출'});
d('notifications',{'zh-CN':'通知中心','en':'Notifications',ja:'通知',ko:'알림'});
d('mark_all_read',{'zh-CN':'全部已读','en':'Mark All Read',ja:'すべて既読',ko:'모두 읽음'});
d('security_settings',{'zh-CN':'安全设置','en':'Security',ja:'セキュリティ',ko:'보안'});
d('two_factor_auth',{'zh-CN':'双因素认证(2FA)','en':'Two-Factor Authentication','ja':'二段階認証','ko':'2단계 인증'});
d('two_factor_desc',{'zh-CN':'开启后登录需验证码','en':'Protect your account with 2FA',ja:'アカウントを保護',ko:'계정 보호'});
d('2fa_enabled',{'zh-CN':'2FA 已开启','en':'2FA Enabled',ja:'2FA 有効',ko:'2FA 활성화됨'});
d('2fa_disabled',{'zh-CN':'2FA 已关闭','en':'2FA Disabled',ja:'2FA 無効',ko:'2FA 비활성화됨'});

// ====== 订单 & 交易状态 ======
d('status_pending',   {'zh-CN':'挂单中','zh-TW':'掛單中',en:'Pending',ja:'待機中',ko:'대기중',es:'Pendiente',ru:'В ожидании',fr:'En attente',de:'Ausstehend',pt:'Pendente',vi:'Đang chờ',th:'รอดำเนินการ'});
d('status_filled',    {'zh-CN':'已成交','zh-TW':'已成交',en:'Filled',ja:'約定済',ko:'체결완료',es:'Ejecutado',ru:'Исполнено',fr:'Exécuté',de:'Ausgeführt',pt:'Executado',vi:'Đã khớp',th:'ดำเนินการสำเร็จ'});
d('status_cancelled2',{'zh-CN':'已取消','zh-TW':'已取消',en:'Cancelled',ja:'取消済',ko:'취소됨',es:'Cancelado',ru:'Отменено',fr:'Annulé',de:'Storniert',pt:'Cancelado',vi:'Đã hủy',th:'ยกเลิกแล้ว'});
d('status_completed', {'zh-CN':'已完成','zh-TW':'已完成',en:'Completed',ja:'完了',ko:'완료',es:'Completado',ru:'Завершено',fr:'Terminé',de:'Abgeschlossen',pt:'Concluído',vi:'Hoàn thành',th:'เสร็จสิ้น'});
d('status_disputed',  {'zh-CN':'争议中','zh-TW':'爭議中',en:'Disputed',ja:'紛争中',ko:'분쟁중',es:'Disputado',ru:'Оспаривается',fr:'Contesté',de:'Beanstandet',pt:'Disputado',vi:'Tranh chấp',th:'มีข้อพิพาท'});
d('status_pending_pay',  {'zh-CN':'待付款','zh-TW':'待付款',en:'Pending Pay',ja:'支払待ち',ko:'결제대기',es:'Pago pendiente',ru:'Ожидает оплаты',fr:'Paiement en attente',de:'Zahlung ausstehend',pt:'Pagamento pendente',vi:'Chờ thanh toán',th:'รอการชำระ'});
d('status_pending_release',{'zh-CN':'待放币','zh-TW':'待放幣',en:'Pending Release',ja:'リリース待ち',ko:'출금대기',es:'Liberación pendiente',ru:'Ожидает выпуска',fr:'Libération en attente',de:'Freigabe ausstehend',pt:'Liberação pendente',vi:'Chờ giải phóng',th:'รอการปล่อย'});

// ====== 支付方式 ======
d('c2c_pay_bank',   {'zh-CN':'银行转账','zh-TW':'銀行轉帳',en:'Bank Transfer',ja:'銀行振込',ko:'은행이체',es:'Transferencia',ru:'Банковский перевод',fr:'Virement bancaire',de:'Banküberweisung',pt:'Transferência',vi:'Chuyển khoản',th:'โอนเงินผ่านธนาคาร'});
d('c2c_pay_alipay', {'zh-CN':'支付宝','zh-TW':'支付寶',en:'Alipay',ja:'Alipay',ko:'알리페이',es:'Alipay',ru:'Alipay',fr:'Alipay',de:'Alipay',pt:'Alipay',vi:'Alipay',th:'Alipay'});
d('c2c_pay_wechat', {'zh-CN':'微信支付','zh-TW':'微信支付',en:'WeChat Pay',ja:'WeChat Pay',ko:'위챗페이',es:'WeChat Pay',ru:'WeChat Pay',fr:'WeChat Pay',de:'WeChat Pay',pt:'WeChat Pay',vi:'WeChat Pay',th:'WeChat Pay'});

// ====== 提现状态 ======
d('wd_approved',{'zh-CN':'已通过','zh-TW':'已通過',en:'Approved',ja:'承認済',ko:'승인됨',es:'Aprobado',ru:'Одобрено',fr:'Approuvé',de:'Genehmigt',pt:'Aprovado',vi:'Đã duyệt',th:'อนุมัติแล้ว'});
d('wd_rejected',{'zh-CN':'已拒绝','zh-TW':'已拒絕',en:'Rejected',ja:'拒否',ko:'거부됨',es:'Rechazado',ru:'Отклонено',fr:'Rejeté',de:'Abgelehnt',pt:'Rejeitado',vi:'Từ chối',th:'ปฏิเสธ'});
d('wd_pending', {'zh-CN':'待审核','zh-TW':'待審核',en:'Pending',ja:'審査中',ko:'검토중',es:'Pendiente',ru:'На рассмотрении',fr:'En attente',de:'Ausstehend',pt:'Pendente',vi:'Đang chờ',th:'รอการตรวจสอบ'});

// ====== 钱包/交易记录 ======
d('no_holdings',  {'zh-CN':'暂无持仓','zh-TW':'暫無持倉',en:'No holdings',ja:'保有なし',ko:'보유없음',es:'Sin tenencias',ru:'Нет позиций',fr:'Aucune position',de:'Keine Bestände',pt:'Sem posições',vi:'Không nắm giữ',th:'ไม่มีการถือครอง'});
d('no_orders_yet',{'zh-CN':'暂无订单','zh-TW':'暫無訂單',en:'No orders yet',ja:'注文なし',ko:'주문없음',es:'Sin órdenes',ru:'Нет ордеров',fr:'Aucun ordre',de:'Keine Aufträge',pt:'Sem ordens',vi:'Chưa có lệnh',th:'ไม่มีคำสั่ง'});
d('no_records',   {'zh-CN':'暂无记录','zh-TW':'暫無記錄',en:'No records',ja:'記録なし',ko:'기록없음',es:'Sin registros',ru:'Нет записей',fr:'Aucun enregistrement',de:'Keine Einträge',pt:'Sem registros',vi:'Không có bản ghi',th:'ไม่มีบันทึก'});
d('no_withdrawals',{'zh-CN':'暂无提现记录','zh-TW':'暫無提現記錄',en:'No withdrawals',ja:'出金履歴なし',ko:'출금기록없음',es:'Sin retiros',ru:'Нет выводов',fr:'Aucun retrait',de:'Keine Auszahlungen',pt:'Sem saques',vi:'Chưa rút tiền',th:'ไม่มีการถอน'});
d('no_notifications',{'zh-CN':'暂无通知','zh-TW':'暫無通知',en:'No notifications',ja:'通知なし',ko:'알림없음',es:'Sin notificaciones',ru:'Нет уведомлений',fr:'Aucune notification',de:'Keine Benachrichtigungen',pt:'Sem notificações',vi:'Không thông báo',th:'ไม่มีการแจ้งเตือน'});
d('no_c2c_orders',{'zh-CN':'暂无C2C订单','zh-TW':'暫無C2C訂單',en:'No C2C orders',ja:'C2C注文なし',ko:'C2C 주문없음',es:'Sin órdenes C2C',ru:'Нет C2C ордеров',fr:'Aucun ordre C2C',de:'Keine C2C-Aufträge',pt:'Sem ordens C2C',vi:'Không có lệnh C2C',th:'ไม่มีคำสั่ง C2C'});

// ====== 弹窗 & 确认 ======
d('deposit_enter_amt',{'zh-CN':'请输入有效金额','zh-TW':'請輸入有效金額',en:'Please enter a valid amount',ja:'有効な金額を入力',ko:'유효한 금액 입력',es:'Ingrese un monto válido',ru:'Введите сумму',fr:'Entrez un montant valide',de:'Gültigen Betrag eingeben',pt:'Digite um valor válido',vi:'Nhập số tiền hợp lệ',th:'กรุณากรอกจำนวนเงินที่ถูกต้อง'});
d('confirm_cancel_ad',{'zh-CN':'确认下架此广告？','zh-TW':'確認下架此廣告？',en:'Confirm to remove this ad?',ja:'この広告を削除しますか？',ko:'광고를 삭제하시겠습니까？',es:'¿Confirmar eliminar anuncio?',ru:'Подтвердить удаление？',fr:'Confirmer la suppression？',de:'Anzeige entfernen bestätigen？',pt:'Confirmar remoção？',vi:'Xác nhận gỡ quảng cáo？',th:'ยืนยันการลบโฆษณา？'});
d('ad_cancelled',   {'zh-CN':'广告已下架','zh-TW':'廣告已下架',en:'Ad removed',ja:'広告削除済',ko:'광고 삭제됨',es:'Anuncio eliminado',ru:'Объявление удалено',fr:'Annonce supprimée',de:'Anzeige entfernt',pt:'Anúncio removido',vi:'Đã gỡ quảng cáo',th:'ลบโฆษณาแล้ว'});
d('ad_published',   {'zh-CN':'广告发布成功！','zh-TW':'廣告發佈成功！',en:'Ad published!',ja:'広告掲載完了！',ko:'광고 게시됨！',es:'¡Anuncio publicado!',ru:'Объявление опубликовано!',fr:'Annonce publiée !',de:'Anzeige veröffentlicht!',pt:'Anúncio publicado!',vi:'Đã đăng quảng cáo!',th:'โฆษณาเผยแพร่แล้ว!'});
d('please_login',   {'zh-CN':'请先登录','zh-TW':'請先登錄',en:'Please login first',ja:'ログインしてください',ko:'로그인 해주세요',es:'Inicie sesión primero',ru:'Сначала войдите',fr:'Veuillez vous connecter',de:'Bitte zuerst anmelden',pt:'Faça login primeiro',vi:'Vui lòng đăng nhập',th:'กรุณาเข้าสู่ระบบก่อน'});
d('order_not_found',{'zh-CN':'订单未找到','zh-TW':'訂單未找到',en:'Order not found',ja:'注文が見つかりません',ko:'주문 찾을수없음',es:'Orden no encontrada',ru:'Ордер не найден',fr:'Ordre introuvable',de:'Auftrag nicht gefunden',pt:'Ordem não encontrada',vi:'Không tìm thấy lệnh',th:'ไม่พบคำสั่ง'});
d('loading',        {'zh-CN':'加载中...','zh-TW':'加載中...',en:'Loading...',ja:'読込中...',ko:'로딩중...',es:'Cargando...',ru:'Загрузка...',fr:'Chargement...',de:'Laden...',pt:'Carregando...',vi:'Đang tải...',th:'กำลังโหลด...'});
d('error_loading',  {'zh-CN':'加载失败','zh-TW':'加載失敗',en:'Failed to load',ja:'読込失敗',ko:'로딩실패',es:'Error al cargar',ru:'Ошибка загрузки',fr:'Échec du chargement',de:'Laden fehlgeschlagen',pt:'Falha ao carregar',vi:'Tải thất bại',th:'โหลดล้มเหลว'});
d('trade_completed',{'zh-CN':'交易完成 ✓','zh-TW':'交易完成 ✓',en:'Trade Completed ✓',ja:'取引完了 ✓',ko:'거래완료 ✓',es:'Operación completada ✓',ru:'Сделка завершена ✓',fr:'Transaction terminée ✓',de:'Handel abgeschlossen ✓',pt:'Negociação concluída ✓',vi:'Giao dịch hoàn tất ✓',th:'การซื้อขายเสร็จสมบูรณ์ ✓'});
d('order_cancelled_text',{'zh-CN':'订单已取消','zh-TW':'訂單已取消',en:'Order Cancelled',ja:'注文取消済',ko:'주문취소됨',es:'Orden cancelada',ru:'Ордер отменен',fr:'Ordre annulé',de:'Auftrag storniert',pt:'Ordem cancelada',vi:'Lệnh đã hủy',th:'คำสั่งถูกยกเลิก'});
d('disputed_pending',{'zh-CN':'争议中 - 等待处理','zh-TW':'爭議中 - 等待處理',en:'Disputed - Pending Review',ja:'紛争中 - 審査待ち',ko:'분쟁중 - 검토대기',es:'Disputado - Pendiente',ru:'Оспаривается - Ожидание',fr:'Contesté - En attente',de:'Beanstandet - Ausstehend',pt:'Disputado - Pendente',vi:'Tranh chấp - Đang chờ',th:'มีข้อพิพาท - รอการตรวจสอบ'});

// ====== 充值提示 ======
d('deposit_select_coin',{'zh-CN':'选择充值币种','zh-TW':'選擇充值幣種',en:'Select Deposit Coin',ja:'入金通貨選択',ko:'입금코인선택',es:'Seleccionar moneda',ru:'Выберите монету',fr:'Choisir la pièce',de:'Coin auswählen',pt:'Selecionar moeda',vi:'Chọn coin nạp',th:'เลือกเหรียญ'});
d('deposit_coin_lbl',{'zh-CN':'币种','zh-TW':'幣種',en:'Coin',ja:'通貨',ko:'코인',es:'Moneda',ru:'Монета',fr:'Pièce',de:'Coin',pt:'Moeda',vi:'Coin',th:'เหรียญ'});
d('deposit_network_lbl',{'zh-CN':'网络','zh-TW':'網絡',en:'Network',ja:'ネットワーク',ko:'네트워크',es:'Red',ru:'Сеть',fr:'Réseau',de:'Netzwerk',pt:'Rede',vi:'Mạng',th:'เครือข่าย'});
d('deposit_summary_lbl',{'zh-CN':'充值信息','zh-TW':'充值信息',en:'Deposit Summary',ja:'入金概要',ko:'입금요약',es:'Resumen',ru:'Сводка',fr:'Résumé',de:'Zusammenfassung',pt:'Resumo',vi:'Tóm tắt',th:'สรุป'});
d('deposit_amt_invalid',{'zh-CN':'金额无效','zh-TW':'金額無效',en:'Invalid amount',ja:'無効な金額',ko:'잘못된금액',es:'Monto inválido',ru:'Неверная сумма',fr:'Montant invalide',de:'Ungültiger Betrag',pt:'Valor inválido',vi:'Số tiền không hợp lệ',th:'จำนวนเงินไม่ถูกต้อง'});

// ====== 交易面板 ======
d('trade_market',  {'zh-CN':'市价','zh-TW':'市價',en:'Market',ja:'成行',ko:'시장가',es:'Mercado',ru:'Рынок',fr:'Marché',de:'Market',pt:'Mercado',vi:'Thị trường',th:'ตลาด'});
d('trade_limit',   {'zh-CN':'限价','zh-TW':'限價',en:'Limit',ja:'指値',ko:'지정가',es:'Límite',ru:'Лимит',fr:'Limite',de:'Limit',pt:'Limite',vi:'Giới hạn',th:'จำกัด'});
d('trade_stop_limit',{'zh-CN':'止损限价','zh-TW':'止損限價',en:'Stop-Limit',ja:'ストップ指値',ko:'스탑지정가',es:'Stop-Límite',ru:'Стоп-лимит',fr:'Stop-Limit',de:'Stop-Limit',pt:'Stop-Limit',vi:'Stop-Limit',th:'Stop-Limit'});
d('trade_enter_amt',{'zh-CN':'请输入有效数量','zh-TW':'請輸入有效數量',en:'Enter a valid amount',ja:'有効な数量を入力',ko:'유효한수량입력',es:'Ingrese cantidad válida',ru:'Введите количество',fr:'Entrez une quantité valide',de:'Gültige Menge eingeben',pt:'Digite quantidade válida',vi:'Nhập số lượng hợp lệ',th:'กรอกจำนวนที่ถูกต้อง'});
d('trade_invalid_price',{'zh-CN':'价格无效','zh-TW':'價格無效',en:'Invalid price',ja:'無効な価格',ko:'잘못된가격',es:'Precio inválido',ru:'Неверная цена',fr:'Prix invalide',de:'Ungültiger Preis',pt:'Preço inválido',vi:'Giá không hợp lệ',th:'ราคาไม่ถูกต้อง'});
d('trade_enter_stop',{'zh-CN':'请输入有效的触发价格','zh-TW':'請輸入有效的觸發價格',en:'Enter a valid trigger price',ja:'有効なトリガー価格を入力',ko:'유효한트리거가격입력',es:'Ingrese precio trigger válido',ru:'Введите триггерную цену',fr:'Entrez un prix déclencheur valide',de:'Gültigen Trigger-Preis eingeben',pt:'Digite preço de gatilho válido',vi:'Nhập giá kích hoạt hợp lệ',th:'กรอกราคาทริกเกอร์ที่ถูกต้อง'});
d('trade_order_success',{'zh-CN':'下单成功！','zh-TW':'下單成功！',en:'Order placed!',ja:'注文完了！',ko:'주문완료！',es:'¡Orden realizada!',ru:'Ордер размещен!',fr:'Ordre passé !',de:'Order aufgegeben!',pt:'Ordem realizada!',vi:'Đặt lệnh thành công!',th:'คำสั่งสำเร็จ!'});
d('trade_limit_pending',{'zh-CN':'限价单已挂单','zh-TW':'限價單已掛單',en:'Limit order pending',ja:'指値注文待機中',ko:'지정가주문대기중',es:'Orden límite pendiente',ru:'Лимитный ордер ожидает',fr:'Ordre limite en attente',de:'Limit-Order ausstehend',pt:'Ordem limite pendente',vi:'Lệnh giới hạn đang chờ',th:'คำสั่งจำกัดรอดำเนินการ'});

// ====== 设置 ======
d('settings_not_bound',{'zh-CN':'未绑定','zh-TW':'未綁定',en:'Not bound',ja:'未設定',ko:'미설정',es:'No vinculado',ru:'Не привязано',fr:'Non lié',de:'Nicht gebunden',pt:'Não vinculado',vi:'Chưa liên kết',th:'ยังไม่ผูก'});
d('settings_saved',{'zh-CN':'保存成功 ✓','zh-TW':'保存成功 ✓',en:'Saved ✓',ja:'保存完了 ✓',ko:'저장됨 ✓',es:'Guardado ✓',ru:'Сохранено ✓',fr:'Enregistré ✓',de:'Gespeichert ✓',pt:'Salvo ✓',vi:'Đã lưu ✓',th:'บันทึกแล้ว ✓'});
d('settings_2fa_enabled_label',{'zh-CN':'已启用','zh-TW':'已啟用',en:'Enabled',ja:'有効',ko:'활성화',es:'Activado',ru:'Включено',fr:'Activé',de:'Aktiviert',pt:'Ativado',vi:'Đã bật',th:'เปิดใช้งาน'});
d('settings_2fa_disabled_label',{'zh-CN':'已禁用','zh-TW':'已禁用',en:'Disabled',ja:'無効',ko:'비활성화',es:'Desactivado',ru:'Отключено',fr:'Désactivé',de:'Deaktiviert',pt:'Desativado',vi:'Đã tắt',th:'ปิดใช้งาน'});
d('settings_invite_code_label',{'zh-CN':'邀请码:','zh-TW':'邀請碼:',en:'Invite:',ja:'招待コード:',ko:'초대코드:',es:'Invitación:',ru:'Приглашение:',fr:'Invitation:',de:'Einladung:',pt:'Convite:',vi:'Mã mời:',th:'รหัสเชิญ:'});
d('settings_vip_label',{'zh-CN':'VIP','zh-TW':'VIP',en:'VIP',ja:'VIP',ko:'VIP',es:'VIP',ru:'VIP',fr:'VIP',de:'VIP',pt:'VIP',vi:'VIP',th:'VIP'});

// ====== 评价 ======
d('review_rating_prompt',{'zh-CN':'为本次交易评分','zh-TW':'為本次交易評分',en:'Rate this trade',ja:'取引を評価',ko:'거래 평가하기',es:'Calificar esta operación',ru:'Оцените сделку',fr:'Noter cette transaction',de:'Diesen Handel bewerten',pt:'Avaliar esta negociação',vi:'Đánh giá giao dịch',th:'ให้คะแนนการเทรด'});
d('review_submitted',{'zh-CN':'评价已提交 ✓','zh-TW':'評價已提交 ✓',en:'Review submitted ✓',ja:'レビュー提出済 ✓',ko:'리뷰제출됨 ✓',es:'Reseña enviada ✓',ru:'Отзыв отправлен ✓',fr:'Avis soumis ✓',de:'Bewertung gesendet ✓',pt:'Avaliação enviada ✓',vi:'Đã gửi đánh giá ✓',th:'ส่งรีวิวแล้ว ✓'});
d('review_enter_comment',{'zh-CN':'评价内容(可选)','zh-TW':'評價內容(可選)',en:'Comment (optional)',ja:'コメント（任意）',ko:'코멘트（선택）',es:'Comentario (opcional)',ru:'Комментарий (необяз.)',fr:'Commentaire (optionnel)',de:'Kommentar (optional)',pt:'Comentário (opcional)',vi:'Bình luận (tùy chọn)',th:'ความคิดเห็น (ไม่บังคับ)'});

// ====== C2C 操作 ======
d('c2c_confirm_pay_prompt',{'zh-CN':'确认您已向卖家完成法币转账？','zh-TW':'確認您已向賣家完成法幣轉賬？',en:'Confirm you have paid the seller in fiat?',ja:'売り手に法定通貨で支払いましたか？',ko:'판매자에게 법정화폐 송금 완료？',es:'¿Confirmar pago fiat al vendedor?',ru:'Подтвердить фиатный перевод？',fr:'Confirmer le paiement fiat？',de:'Fiat-Zahlung bestätigen？',pt:'Confirmar pagamento fiat？',vi:'Xác nhận đã chuyển tiền pháp định cho người bán？',th:'ยืนยันการชำระเงินเฟียตให้ผู้ขาย？'});
d('c2c_release_confirm',{'zh-CN':'确认收到买家法币并释放币？','zh-TW':'確認收到買家法幣並釋放幣？',en:'Confirm receipt of fiat and release crypto?',ja:'法定通貨の受領確認と暗号資産のリリース？',ko:'법정화폐 수령확인 및 코인해제？',es:'¿Confirmar recibo y liberar crypto?',ru:'Подтвердить получение фиата и выпустить？',fr:'Confirmer la réception et libérer？',de:'Fiat-Eingang bestätigen und freigeben？',pt:'Confirmar recebimento e liberar？',vi:'Xác nhận nhận tiền và giải phóng？',th:'ยืนยันการรับเงินเฟียตและปล่อยคริปโต？'});
d('c2c_cancel_order_prompt',{'zh-CN':'确认取消此订单？','zh-TW':'確認取消此訂單？',en:'Confirm to cancel this order?',ja:'この注文をキャンセルしますか？',ko:'주문취소 확인？',es:'¿Confirmar cancelación?',ru:'Подтвердить отмену？',fr:'Confirmer l\'annulation？',de:'Auftragsstornierung bestätigen？',pt:'Confirmar cancelamento？',vi:'Xác nhận hủy lệnh？',th:'ยืนยันการยกเลิกคำสั่ง？'});
d('c2c_dispute_prompt',{'zh-CN':'请输入申诉原因：','zh-TW':'請輸入申訴原因：',en:'Enter dispute reason:',ja:'紛争理由を入力：',ko:'분쟁사유입력：',es:'Ingrese motivo de disputa:',ru:'Введите причину спора:',fr:'Raison du litige :',de:'Streitgrund eingeben:',pt:'Motivo da disputa:',vi:'Nhập lý do tranh chấp:',th:'ระบุเหตุผลข้อพิพาท:'});
d('c2c_pay_confirmed',{'zh-CN':'已确认付款！','zh-TW':'已確認付款！',en:'Payment confirmed!',ja:'支払確認済！',ko:'결제확인됨！',es:'¡Pago confirmado!',ru:'Платеж подтвержден!',fr:'Paiement confirmé !',de:'Zahlung bestätigt!',pt:'Pagamento confirmado!',vi:'Đã xác nhận thanh toán!',th:'ยืนยันการชำระเงินแล้ว!'});
d('c2c_release_success',{'zh-CN':'放币成功！交易完成','zh-TW':'放幣成功！交易完成',en:'Released! Trade completed',ja:'リリース成功！取引完了',ko:'코인해제！거래완료',es:'¡Liberado! Operación completada',ru:'Выпущено! Сделка завершена',fr:'Libéré ! Transaction terminée',de:'Freigegeben! Handel abgeschlossen',pt:'Liberado! Negociação concluída',vi:'Đã giải phóng！Giao dịch hoàn tất',th:'ปล่อยแล้ว！การซื้อขายเสร็จสมบูรณ์'});
d('c2c_order_cancelled',{'zh-CN':'订单已取消','zh-TW':'訂單已取消',en:'Order cancelled',ja:'注文取消済',ko:'주문취소됨',es:'Orden cancelada',ru:'Ордер отменен',fr:'Ordre annulé',de:'Auftrag storniert',pt:'Ordem cancelada',vi:'Lệnh đã hủy',th:'คำสั่งถูกยกเลิก'});
d('c2c_dispute_submitted',{'zh-CN':'申诉已提交','zh-TW':'申訴已提交',en:'Dispute submitted',ja:'紛争提出済',ko:'분쟁제출됨',es:'Disputa enviada',ru:'Спор подан',fr:'Litige soumis',de:'Streit eingereicht',pt:'Disputa enviada',vi:'Đã gửi tranh chấp',th:'ส่งข้อพิพาทแล้ว'});
d('c2c_enter_dispute_reason',{'zh-CN':'请输入申诉原因','zh-TW':'請輸入申訴原因',en:'Please enter dispute reason',ja:'紛争理由を入力してください',ko:'분쟁사유입력',es:'Ingrese motivo',ru:'Введите причину',fr:'Entrez le motif',de:'Grund eingeben',pt:'Digite o motivo',vi:'Nhập lý do',th:'กรุณาระบุเหตุผล'});

// ====== 交易错误 ======
d('trade_insufficient_usdt',{'zh-CN':'USDT余额不足，请先充值','zh-TW':'USDT餘額不足，請先充值',en:'Insufficient USDT balance, please deposit',ja:'USDT残高不足、入金してください',ko:'USDT 잔액부족, 입금해주세요',es:'USDT insuficiente, deposite',ru:'Недостаточно USDT, пополните',fr:'Solde USDT insuffisant',de:'USDT-Guthaben nicht ausreichend',pt:'Saldo USDT insuficiente',vi:'Số dư USDT không đủ',th:'USDT ไม่เพียงพอ'});
d('trade_insufficient_coin',{'zh-CN':'{coin} 余额不足','zh-TW':'{coin} 餘額不足',en:'{coin} balance insufficient',ja:'{coin} 残高不足',ko:'{coin} 잔액부족',es:'{coin} saldo insuficiente',ru:'{coin} недостаточно',fr:'Solde {coin} insuffisant',de:'{coin}-Guthaben nicht ausreichend',pt:'{coin} saldo insuficiente',vi:'{coin} số dư không đủ',th:'{coin} ยอดไม่เพียงพอ'});
d('trade_failed',{'zh-CN':'交易失败','zh-TW':'交易失敗',en:'Trade failed',ja:'取引失敗',ko:'거래실패',es:'Operación fallida',ru:'Сделка не удалась',fr:'Échec de la transaction',de:'Handel fehlgeschlagen',pt:'Negociação falhou',vi:'Giao dịch thất bại',th:'การซื้อขายล้มเหลว'});

// ====== C2C 取单 ======
d('c2c_enter_trade_amount',{'zh-CN':'请输入交易数量 (USDT)','zh-TW':'請輸入交易數量 (USDT)',en:'Enter trade amount (USDT)',ja:'取引数量を入力 (USDT)',ko:'거래수량입력 (USDT)',es:'Ingrese cantidad (USDT)',ru:'Введите сумму (USDT)',fr:'Entrez le montant (USDT)',de:'Betrag eingeben (USDT)',pt:'Digite o valor (USDT)',vi:'Nhập số lượng (USDT)',th:'กรอกจำนวน (USDT)'});
d('c2c_take_success',{'zh-CN':'接单成功！订单已创建','zh-TW':'接單成功！訂單已創建',en:'Order taken! Trade created',ja:'注文受付！取引作成済',ko:'주문접수！거래생성됨',es:'¡Orden tomada!',ru:'Ордер принят!',fr:'Ordre accepté !',de:'Order angenommen!',pt:'Ordem aceita!',vi:'Đã nhận lệnh!',th:'รับคำสั่งแล้ว!'});

// ====== 子导航 ======
d('limit_order', {'zh-CN':'限价','zh-TW':'限價',en:'Limit',ja:'指値',ko:'지정가',es:'Límite',ru:'Лимит',fr:'Limite',de:'Limit',pt:'Limite',vi:'Giới hạn',th:'จำกัด'});
d('market_order',{'zh-CN':'市价','zh-TW':'市價',en:'Market',ja:'成行',ko:'시장가',es:'Mercado',ru:'Рынок',fr:'Marché',de:'Market',pt:'Mercado',vi:'Thị trường',th:'ตลาด'});

// ====== 现货钱包 ======
d('spot_wallet',{'zh-CN':'现货钱包','zh-TW':'現貨錢包',en:'Spot Wallet',ja:'現物ウォレット',ko:'현물지갑',es:'Billetera Spot',ru:'Спотовый кошелек',fr:'Portefeuille Spot',de:'Spot-Wallet',pt:'Carteira Spot',vi:'Ví Spot',th:'กระเป๋า Spot'});
d('deposit_instruction',{'zh-CN':'请向以下地址转入 {coin}','zh-TW':'請向以下地址轉入 {coin}',en:'Send {coin} to the address below',ja:'以下のアドレスに{coin}を送金',ko:'아래 주소로 {coin} 전송',es:'Envíe {coin} a la dirección',ru:'Отправьте {coin} на адрес',fr:'Envoyez {coin} à l\'adresse',de:'Senden Sie {coin} an die Adresse',pt:'Envie {coin} para o endereço',vi:'Gửi {coin} đến địa chỉ',th:'ส่ง {coin} ไปยังที่อยู่ด้านล่าง'});
d('deposit_warning',{'zh-CN':'请务必使用 {network} 网络转账，否则将导致资产丢失','zh-TW':'請務必使用 {network} 網絡轉賬，否則將導致資產丟失',en:'Please use {network} network only, otherwise assets may be lost',ja:'{network}ネットワークのみ使用、さもないと資産喪失',ko:'{network} 네트워크만 사용, 아니면 자산손실',es:'Use solo red {network}',ru:'Используйте только сеть {network}',fr:'Utilisez uniquement le réseau {network}',de:'Nur {network}-Netzwerk verwenden',pt:'Use apenas rede {network}',vi:'Chỉ sử dụng mạng {network}',th:'ใช้เครือข่าย {network} เท่านั้น'});

// ====== 取消操作通用 ======
d('cancel',{'zh-CN':'取消','zh-TW':'取消',en:'Cancel',ja:'取消',ko:'취소',es:'Cancelar',ru:'Отмена',fr:'Annuler',de:'Abbrechen',pt:'Cancelar',vi:'Hủy',th:'ยกเลิก'});
d('confirm',{'zh-CN':'确认','zh-TW':'確認',en:'Confirm',ja:'確認',ko:'확인',es:'Confirmar',ru:'Подтвердить',fr:'Confirmer',de:'Bestätigen',pt:'Confirmar',vi:'Xác nhận',th:'ยืนยัน'});

// ====== 法币 ======
d('c2c_cny_unit',{'zh-CN':'¥{price} CNY','zh-TW':'¥{price} CNY',en:'¥{price} CNY',ja:'¥{price} CNY',ko:'¥{price} CNY',es:'¥{price} CNY',ru:'¥{price} CNY',fr:'¥{price} CNY',de:'¥{price} CNY',pt:'¥{price} CNY',vi:'¥{price} CNY',th:'¥{price} CNY'});

// ====== 买卖方向简称 ======
d('buy_short', {'zh-CN':'买','zh-TW':'買',en:'B',ja:'買',ko:'매',es:'C',ru:'К',fr:'A',de:'K',pt:'C',vi:'M',th:'ซ'});
d('sell_short',{'zh-CN':'卖','zh-TW':'賣',en:'S',ja:'売',ko:'매',es:'V',ru:'П',fr:'V',de:'V',pt:'V',vi:'B',th:'ข'});

// ====== 行情状态标签 ======
d('status_cached', {'zh-CN':'缓存','zh-TW':'緩存',en:'Cached',ja:'キャッシュ',ko:'캐시',es:'Caché',ru:'Кэш',fr:'Cache',de:'Cache',pt:'Cache',vi:'Cache',th:'แคช'});
d('status_simulated',{'zh-CN':'模拟','zh-TW':'模擬',en:'Simulated',ja:'シミュレーション',ko:'시뮬레이션',es:'Simulado',ru:'Симуляция',fr:'Simulé',de:'Simuliert',pt:'Simulado',vi:'Mô phỏng',th:'จำลอง'});
d('status_live',  {'zh-CN':'实时','zh-TW':'實時',en:'Live',ja:'リアルタイム',ko:'실시간',es:'En vivo',ru:'Онлайн',fr:'En direct',de:'Live',pt:'Ao vivo',vi:'Trực tiếp',th:'สด'});
d('spread',       {'zh-CN':'价差','zh-TW':'價差',en:'Spread',ja:'スプレッド',ko:'스프레드',es:'Diferencial',ru:'Спред',fr:'Spread',de:'Spread',pt:'Spread',vi:'Chênh lệch',th:'ส่วนต่าง'});
d('enter_valid_amount',{'zh-CN':'请输入有效数量','zh-TW':'請輸入有效數量',en:'Enter valid amount',ja:'有効な数量を入力',ko:'유효한 수량 입력',es:'Ingrese cantidad válida',ru:'Введите кол-во',fr:'Entrez un montant valide',de:'Gültige Menge eingeben',pt:'Digite valor válido',vi:'Nhập số lượng hợp lệ',th:'กรอกจำนวนที่ถูกต้อง'});
d('invalid_price',{'zh-CN':'价格无效','zh-TW':'價格無效',en:'Invalid price',ja:'無効な価格',ko:'유효하지 않은 가격',es:'Precio inválido',ru:'Неверная цена',fr:'Prix invalide',de:'Ungültiger Preis',pt:'Preço inválido',vi:'Giá không hợp lệ',th:'ราคาไม่ถูกต้อง'});
d('enter_valid_trigger_price',{'zh-CN':'请输入有效的触发价格','zh-TW':'請輸入有效的觸發價格',en:'Enter valid trigger price',ja:'有効なトリガー価格を入力',ko:'유효한 트리거 가격 입력',es:'Ingrese precio de activación',ru:'Введите триггерную цену',fr:'Entrez un prix de déclenchement',de:'Gültigen Trigger-Preis eingeben',pt:'Digite preço de gatilho',vi:'Nhập giá kích hoạt',th:'กรอกราคาทริกเกอร์ที่ถูกต้อง'});
d('no_holdings',  {'zh-CN':'暂无持仓','zh-TW':'暫無持倉',en:'No holdings',ja:'保有なし',ko:'보유없음',es:'Sin tenencias',ru:'Нет позиций',fr:'Aucune position',de:'Keine Bestände',pt:'Sem posições',vi:'Không nắm giữ',th:'ไม่มีการถือครอง'});
d('c2c_enter_valid_price',{'zh-CN':'请输入有效价格','zh-TW':'請輸入有效價格',en:'Enter valid price',ja:'有効な価格を入力',ko:'유효한 가격 입력',es:'Ingrese precio válido',ru:'Введите цену',fr:'Entrez un prix valide',de:'Gültigen Preis eingeben',pt:'Digite preço válido',vi:'Nhập giá hợp lệ',th:'กรอกราคาที่ถูกต้อง'});
d('c2c_enter_valid_amount_range',{'zh-CN':'请输入有效金额范围','zh-TW':'請輸入有效金額範圍',en:'Enter valid amount range',ja:'有効な金額範囲を入力',ko:'유효한 금액 범위 입력',es:'Ingrese rango de monto',ru:'Введите диапазон сумм',fr:'Entrez une fourchette valide',de:'Gültigen Betragsbereich eingeben',pt:'Digite faixa de valor',vi:'Nhập khoảng số tiền',th:'กรอกช่วงจำนวนเงินที่ถูกต้อง'});
d('c2c_min_gt_max',{'zh-CN':'最小金额不能大于最大金额','zh-TW':'最小金額不能大於最大金額',en:'Min amount cannot exceed max',ja:'最小額は最大額を超えられません',ko:'최소 금액이 최대를 초과',es:'Mín no puede exceder máx',ru:'Мин не может быть больше макс',fr:'Le min ne peut dépasser le max',de:'Min darf Max nicht überschreiten',pt:'Mín não pode exceder máx',vi:'Tối thiểu không thể vượt tối đa',th:'ขั้นต่ำต้องไม่เกินสูงสุด'});
d('c2c_select_payment',{'zh-CN':'请选择支付方式','zh-TW':'請選擇支付方式',en:'Select payment method',ja:'支払方法を選択',ko:'결제 수단 선택',es:'Seleccione método de pago',ru:'Выберите способ оплаты',fr:'Choisissez un moyen de paiement',de:'Zahlungsmethode wählen',pt:'Selecione pagamento',vi:'Chọn phương thức',th:'เลือกวิธีการชำระเงิน'});
d('c2c_trade_started',{'zh-CN':'—— 交易已开始 ——','zh-TW':'—— 交易已開始 ——',en:'—— Trade started ——',ja:'—— 取引開始 ——',ko:'—— 거래 시작 ——',es:'—— Operación iniciada ——',ru:'—— Сделка начата ——',fr:'—— Transaction démarrée ——',de:'—— Handel gestartet ——',pt:'—— Negociação iniciada ——',vi:'—— Giao dịch bắt đầu ——',th:'—— การซื้อขายเริ่มต้น ——'});
d('unbound',      {'zh-CN':'未绑定','zh-TW':'未綁定',en:'Not bound',ja:'未绑定',ko:'미연동',es:'No vinculado',ru:'Не привязано',fr:'Non lié',de:'Nicht gebunden',pt:'Não vinculado',vi:'Chưa liên kết',th:'ไม่ได้ผูก'});
d('no_messages_yet',{'zh-CN':'暂无消息','zh-TW':'暫無消息',en:'No messages yet',ja:'メッセージなし',ko:'메시지 없음',es:'Sin mensajes',ru:'Нет сообщений',fr:'Aucun message',de:'Keine Nachrichten',pt:'Sem mensagens',vi:'Chưa có tin nhắn',th:'ยังไม่มีข้อความ'});

// ====== 图表/界面控件 ======
d('chart_loading', {'zh-CN':'加载中...','zh-TW':'載入中...',en:'Loading...',ja:'読み込み中...',ko:'로딩 중...',es:'Cargando...',ru:'Загрузка...',fr:'Chargement...',de:'Laden...',pt:'Carregando...',vi:'Đang tải...',th:'กำลังโหลด...'});
d('interval_1m',  {'zh-CN':'1分','zh-TW':'1分',en:'1m',ja:'1分',ko:'1분',es:'1m',ru:'1м',fr:'1m',de:'1m',pt:'1m',vi:'1p',th:'1น'});
d('interval_5m',  {'zh-CN':'5分','zh-TW':'5分',en:'5m',ja:'5分',ko:'5분',es:'5m',ru:'5м',fr:'5m',de:'5m',pt:'5m',vi:'5p',th:'5น'});
d('interval_15m', {'zh-CN':'15分','zh-TW':'15分',en:'15m',ja:'15分',ko:'15분',es:'15m',ru:'15м',fr:'15m',de:'15m',pt:'15m',vi:'15p',th:'15น'});
d('interval_30m', {'zh-CN':'30分','zh-TW':'30分',en:'30m',ja:'30分',ko:'30분',es:'30m',ru:'30м',fr:'30m',de:'30m',pt:'30m',vi:'30p',th:'30น'});
d('interval_1h',  {'zh-CN':'1时','zh-TW':'1時',en:'1h',ja:'1時',ko:'1시',es:'1h',ru:'1ч',fr:'1h',de:'1h',pt:'1h',vi:'1g',th:'1ชม'});
d('interval_4h',  {'zh-CN':'4时','zh-TW':'4時',en:'4h',ja:'4時',ko:'4시',es:'4h',ru:'4ч',fr:'4h',de:'4h',pt:'4h',vi:'4g',th:'4ชม'});
d('interval_1d',  {'zh-CN':'日线','zh-TW':'日線',en:'1d',ja:'日足',ko:'일봉',es:'1d',ru:'1д',fr:'1j',de:'1T',pt:'1d',vi:'1n',th:'1วัน'});
d('interval_1w',  {'zh-CN':'周线','zh-TW':'週線',en:'1w',ja:'週足',ko:'주봉',es:'1s',ru:'1н',fr:'1sem',de:'1W',pt:'1s',vi:'1t',th:'1ส'});
d('time_col',     {'zh-CN':'时间','zh-TW':'時間',en:'Time',ja:'時間',ko:'시간',es:'Hora',ru:'Время',fr:'Heure',de:'Zeit',pt:'Hora',vi:'Thời gian',th:'เวลา'});
d('pair_col',     {'zh-CN':'交易对','zh-TW':'交易對',en:'Pair',ja:'ペア',ko:'페어',es:'Par',ru:'Пара',fr:'Paire',de:'Paar',pt:'Par',vi:'Cặp',th:'คู่'});
d('side_col',     {'zh-CN':'方向','zh-TW':'方向',en:'Side',ja:'方向',ko:'방향',es:'Lado',ru:'Сторона',fr:'Côté',de:'Seite',pt:'Lado',vi:'Hướng',th:'ด้าน'});
d('type_col',     {'zh-CN':'类型','zh-TW':'類型',en:'Type',ja:'種類',ko:'유형',es:'Tipo',ru:'Тип',fr:'Type',de:'Typ',pt:'Tipo',vi:'Loại',th:'ประเภท'});
d('status_col',   {'zh-CN':'状态','zh-TW':'狀態',en:'Status',ja:'状態',ko:'상태',es:'Estado',ru:'Статус',fr:'Statut',de:'Status',pt:'Status',vi:'Trạng thái',th:'สถานะ'});
d('note_col',     {'zh-CN':'备注','zh-TW':'備註',en:'Note',ja:'備考',ko:'비고',es:'Nota',ru:'Прим.',fr:'Note',de:'Notiz',pt:'Nota',vi:'Ghi chú',th:'หมายเหตุ'});
d('c2c_merchant', {'zh-CN':'商家','zh-TW':'商家',en:'Merchant',ja:'販売者',ko:'판매자',es:'Vendedor',ru:'Продавец',fr:'Marchand',de:'Händler',pt:'Comerciante',vi:'Người bán',th:'ผู้ค้า'});
d('c2c_amount_col',{'zh-CN':'数量','zh-TW':'數量',en:'Amount',ja:'数量',ko:'수량',es:'Cantidad',ru:'Кол-во',fr:'Montant',de:'Menge',pt:'Quantidade',vi:'Số lượng',th:'จำนวน'});
d('c2c_price_col', {'zh-CN':'价格','zh-TW':'價格',en:'Price',ja:'価格',ko:'가격',es:'Precio',ru:'Цена',fr:'Prix',de:'Preis',pt:'Preço',vi:'Giá',th:'ราคา'});
d('c2c_payment_col',{'zh-CN':'支付方式','zh-TW':'支付方式',en:'Payment',ja:'支払方法',ko:'결제',es:'Pago',ru:'Оплата',fr:'Paiement',de:'Zahlung',pt:'Pagamento',vi:'Thanh toán',th:'การชำระ'});
d('c2c_action_col',{'zh-CN':'操作','zh-TW':'操作',en:'Action',ja:'操作',ko:'작업',es:'Acción',ru:'Действие',fr:'Action',de:'Aktion',pt:'Ação',vi:'Hành động',th:'การดำเนินการ'});
d('simulated_data',{'zh-CN':'演示数据','zh-TW':'演示數據',en:'Demo Data',ja:'デモデータ',ko:'데모데이터',es:'Datos demo',ru:'Демо',fr:'Données démo',de:'Demodaten',pt:'Dados demo',vi:'Dữ liệu demo',th:'ข้อมูลตัวอย่าง'});
d('benefit_pairs',{'zh-CN':'✓ 100+ 加密货币交易对','zh-TW':'✓ 100+ 加密貨幣交易對',en:'✓ 100+ Crypto Trading Pairs',ja:'✓ 100以上の暗号資産ペア',ko:'✓ 100개 이상의 암호화폐 페어',es:'✓ Más de 100 pares cripto',ru:'✓ 100+ крипто-пар',fr:'✓ Plus de 100 paires crypto',de:'✓ Über 100 Krypto-Paare',pt:'✓ Mais de 100 pares cripto',vi:'✓ Hơn 100 cặp giao dịch',th:'✓ 100+ คู่เทรดคริปโต'});
d('benefit_market',{'zh-CN':'✓ 实时币安行情数据','zh-TW':'✓ 實時幣安行情數據',en:'✓ Real-time Binance Market Data',ja:'✓ リアルタイム Binance データ',ko:'✓ 실시간 바이낸스 시세',es:'✓ Datos de mercado Binance',ru:'✓ Рыночные данные Binance',fr:'✓ Données de marché Binance',de:'✓ Echtzeit-Binance-Daten',pt:'✓ Dados de mercado Binance',vi:'✓ Dữ liệu Binance thời gian thực',th:'✓ ข้อมูลตลาด Binance แบบเรียลไทม์'});
d('benefit_chart',{'zh-CN':'✓ 专业图表工具','zh-TW':'✓ 專業圖表工具',en:'✓ Professional Charting Tools',ja:'✓ プロ仕様のチャート',ko:'✓ 전문 차트 도구',es:'✓ Gráficos profesionales',ru:'✓ Профессиональные графики',fr:'✓ Outils graphiques pro',de:'✓ Profi-Chart-Tools',pt:'✓ Gráficos profissionais',vi:'✓ Công cụ biểu đồ chuyên nghiệp',th:'✓ เครื่องมือกราฟมืออาชีพ'});
d('benefit_zero',{'zh-CN':'✓ 零门槛真实交易','zh-TW':'✓ 零門檻真實交易',en:'✓ Zero threshold real trading',ja:'✓ ゼロ閾値のリアル取引',ko:'✓ 무장벽 실제 거래',es:'✓ Trading real sin umbral',ru:'✓ Реальная торговля без порога',fr:'✓ Trading réel sans seuil',de:'✓ Echter Handel ohne Hürden',pt:'✓ Trading real sem barreiras',vi:'✓ Giao dịch thực không rào cản',th:'✓ เทรดจริงไร้ขีดจำกัด'});
d('benefit_free',{'zh-CN':'✓ 免费注册，模拟交易','zh-TW':'✓ 免費註冊，模擬交易',en:'✓ Free registration, simulated trading',ja:'✓ 無料登録、模擬取引',ko:'✓ 무료가입, 모의거래',es:'✓ Registro gratis, trading simulado',ru:'✓ Бесплатная регистрация',fr:'✓ Inscription gratuite',de:'✓ Kostenlose Registrierung',pt:'✓ Cadastro grátis',vi:'✓ Đăng ký miễn phí',th:'✓ ลงทะเบียนฟรี'});
d('benefit_realtime',{'zh-CN':'✓ 实时行情 + K线图表','zh-TW':'✓ 實時行情 + K線圖表',en:'✓ Real-time market + charts',ja:'✓ リアルタイム相場 + チャート',ko:'✓ 실시간 시세 + 차트',es:'✓ Mercado en tiempo real',ru:'✓ Рынок в реальном времени',fr:'✓ Marché en temps réel',de:'✓ Echtzeit-Markt',pt:'✓ Mercado em tempo real',vi:'✓ Thị trường thời gian thực',th:'✓ ตลาดเรียลไทม์'});
d('benefit_orders',{'zh-CN':'✓ 市价单 & 限价单','zh-TW':'✓ 市價單 & 限價單',en:'✓ Market & Limit orders',ja:'✓ 成行注文 & 指値注文',ko:'✓ 시장가 & 지정가 주문',es:'✓ Órdenes mercado y límite',ru:'✓ Рыночные и лимитные',fr:'✓ Ordres marché et limite',de:'✓ Market- & Limit-Orders',pt:'✓ Ordens mercado e limite',vi:'✓ Lệnh thị trường & giới hạn',th:'✓ คำสั่งตลาด & จำกัด'});

// ====== C2C 状态 & 界面 ======
d('status_pending_pay',   {'zh-CN':'待付款','zh-TW':'待付款',en:'Pending Pay',ja:'支払待ち',ko:'결제대기',es:'Pendiente pago',ru:'Ожидает оплаты',fr:'Paiement en attente',de:'Zahlung ausstehend',pt:'Pagamento pendente',vi:'Chờ thanh toán',th:'รอการชำระเงิน'});
d('status_pending_release',{'zh-CN':'待放币','zh-TW':'待放幣',en:'Pending Release',ja:'リリース待ち',ko:'출금대기',es:'Pendiente liberar',ru:'Ожидает выпуска',fr:'Libération en attente',de:'Freigabe ausstehend',pt:'Liberação pendente',vi:'Chờ giải phóng',th:'รอการปล่อย'});
d('status_disputed',       {'zh-CN':'争议中','zh-TW':'爭議中',en:'Disputed',ja:'紛争中',ko:'분쟁중',es:'Disputado',ru:'Оспаривается',fr:'Litigieux',de:'Bestritten',pt:'Disputado',vi:'Tranh chấp',th:'มีข้อพิพาท'});
d('c2c_status_completed',  {'zh-CN':'已完成','zh-TW':'已完成',en:'Completed',ja:'完了',ko:'완료',es:'Completado',ru:'Завершено',fr:'Terminé',de:'Abgeschlossen',pt:'Concluído',vi:'Hoàn tất',th:'เสร็จสิ้น'});
d('network_warning',       {'zh-CN':'⚠ 请使用正确的网络','zh-TW':'⚠ 請使用正確的網絡',en:'⚠ Use the correct network',ja:'⚠ 正しいネットワークを使用',ko:'⚠ 올바른 네트워크 사용',es:'⚠ Use la red correcta',ru:'⚠ Используйте правильную сеть',fr:'⚠ Utilisez le bon réseau',de:'⚠ Richtiges Netzwerk verwenden',pt:'⚠ Use a rede correta',vi:'⚠ Dùng đúng mạng',th:'⚠ ใช้เครือข่ายที่ถูกต้อง'});
d('deposit_network_label', {'zh-CN':'网络：','zh-TW':'網絡：',en:'Network: ',ja:'ネットワーク: ',ko:'네트워크: ',es:'Red: ',ru:'Сеть: ',fr:'Réseau : ',de:'Netzwerk: ',pt:'Rede: ',vi:'Mạng: ',th:'เครือข่าย: '});
d('deposit_amount_label',  {'zh-CN':'金额：','zh-TW':'金額：',en:'Amount: ',ja:'金額：',ko:'금액：',es:'Monto: ',ru:'Сумма: ',fr:'Montant : ',de:'Betrag: ',pt:'Valor: ',vi:'Số tiền: ',th:'จำนวน: '});
d('c2c_chat_placeholder',  {'zh-CN':'输入消息...','zh-TW':'輸入消息...',en:'Type a message...',ja:'メッセージ入力...',ko:'메시지 입력...',es:'Escriba un mensaje...',ru:'Введите сообщение...',fr:'Tapez un message...',de:'Nachricht eingeben...',pt:'Digite uma mensagem...',vi:'Nhập tin nhắn...',th:'พิมพ์ข้อความ...'});
d('c2c_chat_send',         {'zh-CN':'发送','zh-TW':'發送',en:'Send',ja:'送信',ko:'보내기',es:'Enviar',ru:'Отправить',fr:'Envoyer',de:'Senden',pt:'Enviar',vi:'Gửi',th:'ส่ง'});
d('c2c_remark_ph',         {'zh-CN':'15分钟内付款...','zh-TW':'15分鐘內付款...',en:'Payment within 15 mins...',ja:'15分以内に支払...',ko:'15분 내 결제...',es:'Pago en 15 min...',ru:'Оплата в течение 15 мин...',fr:'Paiement sous 15 min...',de:'Zahlung innerhalb 15 Min...',pt:'Pagamento em 15 min...',vi:'Thanh toán trong 15 phút...',th:'ชำระเงินภายใน 15 นาที...'});
d('rating_tap_hint',       {'zh-CN':'点击评分','zh-TW':'點擊評分',en:'Tap to rate',ja:'タップして評価',ko:'눌러서 평가',es:'Toque para calificar',ru:'Нажмите для оценки',fr:'Appuyez pour noter',de:'Zum Bewerten tippen',pt:'Toque para avaliar',vi:'Chạm để đánh giá',th:'แตะเพื่อให้คะแนน'});
d('rating_comment_ph',     {'zh-CN':'写评论（可选）','zh-TW':'寫評論（可選）',en:'Write a comment (optional)',ja:'コメントを書く（任意）',ko:'댓글 작성 (선택)',es:'Escriba un comentario (opcional)',ru:'Напишите комментарий',fr:'Écrivez un commentaire',de:'Kommentar schreiben (optional)',pt:'Escreva um comentário',vi:'Viết bình luận (tùy chọn)',th:'เขียนความคิดเห็น (ไม่บังคับ)'});
d('phone_placeholder',     {'zh-CN':'+86 13800138000','zh-TW':'+886 912345678',en:'+1 5550123456',ja:'090-1234-5678',ko:'010-1234-5678',es:'+34 612345678',ru:'+7 9991234567',fr:'+33 612345678',de:'+49 1701234567',pt:'+55 11912345678',vi:'+84 912345678',th:'+66 812345678'});
d('trade_amount_ph',       {'zh-CN':'数量','zh-TW':'數量',en:'Amount',ja:'数量',ko:'수량',es:'Cantidad',ru:'Кол-во',fr:'Montant',de:'Menge',pt:'Quantidade',vi:'Số lượng',th:'จำนวน'});
d('deposit_enter_ph',      {'zh-CN':'输入金额','zh-TW':'輸入金額',en:'Enter amount',ja:'金額を入力',ko:'금액 입력',es:'Ingrese monto',ru:'Введите сумму',fr:'Entrez le montant',de:'Betrag eingeben',pt:'Digite o valor',vi:'Nhập số tiền',th:'กรอกจำนวน'});
d('withdraw_addr_ph',      {'zh-CN':'输入收款地址','zh-TW':'輸入收款地址',en:'Enter receiving address',ja:'受取アドレスを入力',ko:'수신 주소 입력',es:'Ingrese dirección',ru:'Введите адрес',fr:'Entrez l\'adresse',de:'Empfängeradresse eingeben',pt:'Digite o endereço',vi:'Nhập địa chỉ nhận',th:'กรอกที่อยู่รับ'});
d('withdraw_memo_ph',      {'zh-CN':'可选','zh-TW':'可選',en:'Optional',ja:'任意',ko:'선택',es:'Opcional',ru:'Опционально',fr:'Optionnel',de:'Optional',pt:'Opcional',vi:'Tùy chọn',th:'ไม่บังคับ'});
d('withdraw_min_ph',       {'zh-CN':'最低 10 USDT','zh-TW':'最低 10 USDT',en:'Minimum 10 USDT',ja:'最低 10 USDT',ko:'최소 10 USDT',es:'Mínimo 10 USDT',ru:'Мин. 10 USDT',fr:'Minimum 10 USDT',de:'Mindestens 10 USDT',pt:'Mínimo 10 USDT',vi:'Tối thiểu 10 USDT',th:'ขั้นต่ำ 10 USDT'});
d('trade_limit_ph',        {'zh-CN':'限价','zh-TW':'限價',en:'Limit price',ja:'指値価格',ko:'지정가',es:'Precio límite',ru:'Лимитная цена',fr:'Prix limite',de:'Limit-Preis',pt:'Preço limite',vi:'Giá giới hạn',th:'ราคาจำกัด'});
d('trade_trigger_ph',      {'zh-CN':'触发价','zh-TW':'觸發價',en:'Trigger price',ja:'トリガー価格',ko:'트리거 가격',es:'Precio trigger',ru:'Триггерная цена',fr:'Prix déclencheur',de:'Trigger-Preis',pt:'Preço de gatilho',vi:'Giá kích hoạt',th:'ราคาทริกเกอร์'});
d('market_search_ph',      {'zh-CN':'搜索币种...','zh-TW':'搜尋幣種...',en:'Search coins...',ja:'通貨検索...',ko:'코인 검색...',es:'Buscar monedas...',ru:'Поиск монет...',fr:'Rechercher...',de:'Münzen suchen...',pt:'Buscar moedas...',vi:'Tìm kiếm...',th:'ค้นหาเหรียญ...'});

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
  const path = window.location.pathname;
  const newPath = path.replace(/^\/(en|zh-CN|zh-TW|ja|ko|es|ru|fr|de|pt|vi|th)\//, '/' + lang + '/');
  if (newPath !== path) {
    history.replaceState(null, '', newPath);
  }
  // 关闭下拉
  const drop = document.getElementById('lang-drop');
  if (drop) drop.classList.add('hidden');

  // 根据当前显示的页面，重新渲染动态内容（JS innerHTML 生成的翻译）
  function reApplyLater() { setTimeout(applyLang, 200); }
  var pg = function(id) { var e = document.getElementById(id); return e && !e.classList.contains('hidden'); };

  if (pg('page-trade')) {
    updateAll();
    reApplyLater();
  } else if (pg('page-wallet')) {
    loadWalletPage().then(reApplyLater).catch(reApplyLater);
  } else if (pg('page-orders')) {
    loadOrdersPage().then(reApplyLater).catch(reApplyLater);
  } else if (pg('page-c2c')) {
    loadC2CAds().then(reApplyLater).catch(reApplyLater);
  } else if (pg('page-invite')) {
    if (typeof loadInvitePage === 'function') loadInvitePage().then(reApplyLater).catch(reApplyLater);
  } else if (pg('page-settings')) {
    if (typeof loadSettings === 'function') loadSettings().then(reApplyLater).catch(reApplyLater);
  } else if (pg('page-login') || pg('page-register') || pg('page-forgot')) {
    // 登录/注册/忘记密码页主要使用 data-i18n，applyLang() 已处理
    reApplyLater();
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
  authVerified: false, // 只有 API 验证通过后才为 true
  prices: {},
  symbol: 'BTC',
  side: 'buy',
  orderType: 'market',
  interval: '4h',
  klines: [],
  orderbook: { bids: [], asks: [] },
  sortKey: 'vol',
  timers: [],
  crosshair: { index: -1, visible: false }
};
const FEE = 0.001;

// ========== API ==========
const API_BASE = location.hostname === 'any73991-lang.github.io'
  ? 'https://561f2818e72c489fad39fbdee59baca0.codebuddy.cloudstudio.run'
  : '';
const api = {
  async req(url, opts = {}) {
    const h = { 'Content-Type': 'application/json' };
    if (ST.token) h['Authorization'] = 'Bearer ' + ST.token;
    const fullUrl = url.startsWith('/api') ? API_BASE + url : url;
    const r = await fetch(fullUrl, { ...opts, headers: h });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || '请求失败');
    return d;
  },
  get: url => api.req(url),
  post: (url, body) => api.req(url, { method: 'POST', body: JSON.stringify(body) })
};

// ========== 演示数据 (API 不可用时的回退) ==========
const DEMO_PRICES = {
  BTC: 87500, ETH: 3420, BNB: 625, SOL: 148, XRP: 2.35,
  ADA: 0.72, DOGE: 0.175, AVAX: 38.5, DOT: 7.2, MATIC: 0.58,
  LINK: 15.2, UNI: 8.8, ATOM: 7.5, LTC: 82, FIL: 5.4,
  NEAR: 5.2, OP: 1.85, ARB: 0.92, APT: 8.5, SUI: 1.15,
  TON: 5.8, INJ: 22.5, SEI: 0.42, TIA: 6.8
};
var demoJitter = {};
function _genDemoPrices() {
  var prices = {};
  Object.keys(DEMO_PRICES).forEach(function(sym) {
    var base = DEMO_PRICES[sym];
    if (!demoJitter[sym]) demoJitter[sym] = (Math.random() - 0.5) * 0.02;
    demoJitter[sym] += (Math.random() - 0.5) * 0.003;
    demoJitter[sym] = Math.max(-0.08, Math.min(0.08, demoJitter[sym]));
    var price = base * (1 + demoJitter[sym]);
    var chg = +(demoJitter[sym] * 100).toFixed(2);
    prices[sym] = {
      price: +price.toFixed(4),
      change24h: chg,
      high24h: +(price * (1 + Math.abs(demoJitter[sym]) * 1.5)).toFixed(4),
      low24h: +(price * (1 - Math.abs(demoJitter[sym]) * 1.5)).toFixed(4),
      volume24h: +(base * (800 + Math.random() * 1200)).toFixed(2)
    };
  });
  return prices;
}
function _genDemoKlines(symbol, interval) {
  var base = DEMO_PRICES[symbol] || 10;
  var intervals = { '1m':60000, '5m':300000, '15m':900000, '30m':1800000, '1h':3600000, '4h':14400000, '1d':86400000, '1w':604800000 };
  var ms = intervals[interval] || 14400000;
  var klines = [], now = Date.now(), pr = base * (0.9 + Math.random() * 0.1);
  for (var i = 80; i >= 0; i--) {
    var vol = base * (0.5 + Math.random() * 2);
    var change = (Math.random() - 0.5) * 0.04;
    var o = pr, c = o * (1 + change);
    var h = Math.max(o, c) * (1 + Math.random() * 0.01);
    var l = Math.min(o, c) * (1 - Math.random() * 0.01);
    klines.push({ time: now - i * ms, open: +o.toFixed(4), high: +h.toFixed(4), low: +l.toFixed(4), close: +c.toFixed(4), volume: +vol.toFixed(2) });
    pr = c;
  }
  return klines;
}
function _genDemoOrderbook(symbol) {
  var base = DEMO_PRICES[symbol] || 10;
  var bids = [], asks = [];
  for (var i = 0; i < 15; i++) {
    bids.push([+(base * (1 - (i + 1) * 0.001)).toFixed(4), +(Math.random() * 5 + 0.1).toFixed(4)]);
    asks.push([+(base * (1 + (i + 1) * 0.001)).toFixed(4), +(Math.random() * 5 + 0.1).toFixed(4)]);
  }
  return { bids: bids, asks: asks };
}
var demoMode = false;

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

function fmtP(p) { if(p>=1e4)return p.toLocaleString('en-US',{maximumFractionDigits:0});if(p>=1000)return p.toLocaleString('en-US',{maximumFractionDigits:2});if(p>=1)return p.toFixed(2);if(p>=0.01)return p.toFixed(4);if(p>=0.0001)return p.toFixed(6);if(p>=0.000001)return p.toFixed(8);return p.toFixed(10); }
function fmtV(v) { return v >= 1e9 ? (v / 1e9).toFixed(2) + 'B' : v >= 1e6 ? (v / 1e6).toFixed(2) + 'M' : v >= 1e3 ? (v / 1e3).toFixed(1) + 'K' : v.toFixed(0); }
function fmtT(t) { return new Date(t).toLocaleString(currentLang || 'en', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }); }
function errShow(id, msg) { const e = $(id); if (e) { e.textContent = msg; setTimeout(() => e.textContent = '', 4000); } }

// ========== URL 路径映射 (支持 /{lang}/...) ==========
function navTo(path) {
  // 去掉旧格式
  if (path.startsWith('/en/') || path.startsWith('/zh-') || path.match(/^\/[a-z]{2}\//)) {
    history.pushState(null, '', path);
    route(); return;
  }
  // 自动加上语言前缀
  const lang = currentLang;
  history.pushState(null, '', '/' + lang + path);
  route();
}

function route() {
  const path = window.location.pathname;

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
  if (!lang && path.match(/^\/(login|register|trade|wallet|orders|c2c)/)) {
    return location.replace('/' + currentLang + path);
  }
  if (!lang && path === '/') {
    history.replaceState(null, '', '/' + currentLang + '/trade/BTC_USDT');
    return route();
  }

  // 隐藏所有页面
  $$('.page-auth, .page-trade, .page-c2c, .page-generic').forEach(p => p.classList.add('hidden'));

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
  if (restPath === '/c2c' || restPath.startsWith('/c2c')) { showC2C(); applyLang(); return; }
  if (restPath === '/settings') { showSettingsPage(); applyLang(); return; }
  if (restPath === '/forgot') { showForgotPassword(); applyLang(); return; }


  // 默认 → 当前语言交易页（SPA 内跳转，避免闪屏）
  var defaultPath = ST.token ? '/trade/BTC_USDT' : '/login';
  history.replaceState(null, '', '/' + currentLang + defaultPath);
  return route();
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
  if (!ST.token) { location.replace('/' + currentLang + '/login'); return; }
  $$('.page-auth,.page-trade,.page-generic').forEach(function(p){ p.classList.add('hidden'); });
  $('page-wallet').classList.remove('hidden');
  updateNavAuth(true);
  highlightNav('/wallet');
  document.title = t('assets') + ' | CoinTrade Pro';
  loadWalletPage();
  setTimeout(function(){applyLang()}, 100);
}

function showOrders() {
  if (!ST.token) { location.replace('/' + currentLang + '/login'); return; }
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
    $('w-withdraw-btn').onclick = openWithdraw;
    loadWithdrawHistory();
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
        + '<td style="padding:6px 8px;color:var(--text2)">' + t(o.type === 'market' ? 'trade_market' : o.type === 'limit' ? 'trade_limit' : 'trade_stop_limit') + '</td>'
        + '<td style="padding:6px 8px;color:' + (o.status==='filled'?'#0ECB81':o.status==='cancelled'?'#F6465D':'#F0B90B') + '">' + (o.status==='filled'?t('status_filled'):o.status==='cancelled'?t('status_cancelled2'):t('status_pending')) + '</td>'
        + '</tr>';
    });
    if (!rows) rows = '<tr><td colspan="8" style="padding:24px;text-align:center;color:var(--text2)" data-i18n="no_data">' + t('no_data') + '</td></tr>';
    $('o-orders-body').innerHTML = rows;
  } catch(e){ console.error(e); }
}

function showInvite() {
  if (!ST.token) { location.replace('/' + currentLang + '/login'); return; }
  $$('.page-auth,.page-trade,.page-generic,.page-c2c').forEach(function(p){ p.classList.add('hidden'); });
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

// ========== 设置页 ==========
function showSettingsPage() {
  if (!ST.token) { location.replace('/' + currentLang + '/login'); return; }
  $$('.page-auth,.page-trade,.page-generic,.page-c2c').forEach(function(p){ p.classList.add('hidden'); });
  $('page-settings').classList.remove('hidden');
  updateNavAuth(true); highlightNav('');
  document.title = t('settings') + ' | CoinUSDT C2C';
  loadSettings(); setTimeout(function(){ applyLang(); }, 100);
}
async function loadSettings() {
  try {
    var d = await api.get('/api/auth/settings');
    var s = d.settings;
    $('set-username').value = s.username;
    $('set-email').value = s.email || t('unbound');
    $('set-phone').value = s.phone || '';
    $('set-lang').value = s.language_pref || currentLang;
    $('set-vip-info').innerHTML = 'VIP ' + (s.vip_level || 0) + ' | 2FA: ' + (s.two_fa_enabled ? '<span style="color:var(--green)">' + t('settings_2fa_enabled_label') + '</span>' : t('settings_2fa_disabled_label')) + ' | ' + t('settings_invite_code_label') + ' ' + s.invite_code;
    // 2FA 开关状态
    if ($('set-2fa-check')) {
      $('set-2fa-check').checked = s.two_fa_enabled;
      $('set-2fa-toggle').classList.toggle('active', s.two_fa_enabled);
    }
  } catch(e){}
}
async function saveProfile() {
  var phone = $('set-phone').value.trim(), lang = $('set-lang').value;
  try { await api.post('/api/auth/update-profile', { phone: phone, language: lang }); showToast(t('save') + ' ✓'); }
  catch(e) { errShow('set-profile-error', e.message); }
}
async function changePassword() {
  var oldPw = $('set-old-pw').value, newPw = $('set-new-pw').value;
  if (!oldPw || !newPw) return errShow('set-pwd-error', t('fill_all_fields'));
  if (newPw.length < 6) return errShow('set-pwd-error', t('password_too_short'));
  try {
    var d = await api.post('/api/auth/change-password', { old_password: oldPw, new_password: newPw });
    showToast(d.message); $('set-old-pw').value = ''; $('set-new-pw').value = '';
    setTimeout(function(){ logout(); }, 2000);
  } catch(e) { errShow('set-pwd-error', e.message); }
}

// ========== C2C 评价 ==========
var ratingState = { orderId: '', rating: 0 };

function openRatingModal(orderId) {
  ratingState.orderId = orderId;
  ratingState.rating = 0;
  $('c2c-rating-modal').classList.remove('hidden');
  $('c2c-rating-comment').value = '';
  $('c2c-rating-error').textContent = '';
  $('c2c-rating-hint').textContent = t('review_rating_prompt');
  // 重置所有星星
  $$('#c2c-rating-stars .c2c-star').forEach(function(s) {
    s.classList.remove('selected', 'hover');
    s.textContent = '☆';
  });
}

async function submitRating() {
  if (ratingState.rating < 1 || ratingState.rating > 5) {
    return errShow('c2c-rating-error', t('review_select_rating'));
  }
  var comment = $('c2c-rating-comment').value.trim();
  try {
    await api.post('/api/c2c/orders/' + ratingState.orderId + '/review', {
      rating: ratingState.rating,
      comment: comment
    });
    $('c2c-rating-modal').classList.add('hidden');
    showToast(t('review_submitted'));
    // 刷新 C2C 订单
    if (C2C.currentOrder) openOrderChat(C2C.currentOrder.order_id);
  } catch(e) { errShow('c2c-rating-error', e.message); }
}

function updateNavAuth(loggedIn) {
  $('nav-guest').classList.toggle('hidden', loggedIn);
  $('nav-user').classList.toggle('hidden', !loggedIn);
  // 控制所有需要登录的元素：必须 API 验证通过后才显示
  var showAuth = loggedIn && ST.authVerified && ST.user;
  $$('.auth-only').forEach(function(el) {
    if (showAuth) el.classList.add('auth-shown');
    else el.classList.remove('auth-shown');
  });
  if (loggedIn && ST.authVerified && ST.user) {
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
  } catch (e) { /* ignore */ }
}

// ========== 认证 ==========
async function login() {
  const u = $('login-username').value.trim(), p = $('login-password').value;
  if (!u || !p) return errShow('login-error', t('fill_all_fields'));
  try {
    const d = await api.post('/api/auth/login', { username: u, password: p });
    saveAuth(d);
    location.href = '/' + currentLang + '/trade/BTC_USDT';
  } catch (e) { errShow('login-error', e.message); }
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
    // 验证码已发送至邮箱
    showToast(d.message);
    $('reg-step1').classList.add('hidden');
    $('reg-step2').classList.remove('hidden');
    $('reg-error').textContent = '';
  } catch (err) { errShow('reg-error', err.message); }
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

// ====== 忘记密码 ======
function showForgotPassword() {
  $$('.page-auth,.page-trade,.page-c2c,.page-generic').forEach(p => p.classList.add('hidden'));
  $('page-forgot').classList.remove('hidden');
  updateNavAuth(false);
  $('forgot-step1').classList.remove('hidden');
  $('forgot-step2').classList.add('hidden');
  $('forgot-email').value = '';
  $('forgot-code').value = '';
  $('forgot-new-pw').value = '';
  $('forgot-error').textContent = '';
  $('forgot-error2').textContent = '';
  document.title = t('forgot_pwd') + ' | CoinUSDT C2C';
  applyLang();
}

async function sendResetCode() {
  var email = $('forgot-email').value.trim();
  if (!email || !email.includes('@')) return errShow('forgot-error', t('invalid_email'));
  try {
    var d = await api.post('/api/auth/forgot-password', { email: email });
    showToast(d.message);
    $('forgot-step1').classList.add('hidden');
    $('forgot-step2').classList.remove('hidden');
  } catch(e) { errShow('forgot-error', e.message); }
}

async function resetPassword() {
  var code = $('forgot-code').value.trim();
  var pw = $('forgot-new-pw').value;
  var email = $('forgot-email').value.trim();
  if (!code || !pw) return errShow('forgot-error2', t('fill_all_fields'));
  if (pw.length < 6) return errShow('forgot-error2', t('password_too_short'));
  try {
    var d = await api.post('/api/auth/reset-password', { email: email, code: code, password: pw });
    showToast(d.message);
    setTimeout(function(){ location.href = '/' + currentLang + '/login'; }, 1500);
  } catch(e) { errShow('forgot-error2', e.message); }
}

function forgotBackStep1() {
  $('forgot-step2').classList.add('hidden');
  $('forgot-step1').classList.remove('hidden');
  $('forgot-code').value = '';
  $('forgot-error2').textContent = '';
}


function backToRegStep1() {
  $('reg-step2').classList.add('hidden');
  $('reg-step1').classList.remove('hidden');
  $('reg-code').value = '';
  $('reg-error2').textContent = '';
}

function saveAuth(d) {
  ST.token = d.token; ST.user = d.user; ST.authVerified = true;
  localStorage.setItem('ct_token', d.token);
  localStorage.setItem('ct_user', JSON.stringify(d.user));
}

function logout() {
  ST.token = null; ST.user = null; ST.authVerified = false;
  $$('.auth-only').forEach(function(el) { el.classList.remove('auth-shown'); });
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
  // 三重检查：token + authVerified + user，防止 localStorage 残留数据
  if (!ST.token || !ST.authVerified || !ST.user) {
    ST.token = null; ST.user = null; ST.authVerified = false;
    localStorage.removeItem('ct_token'); localStorage.removeItem('ct_user');
    location.href = '/' + currentLang + '/login?redirect=' + encodeURIComponent(location.pathname);
    return;
  }
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
  // 必须登录
  if (!ST.token || !ST.authVerified || !ST.user) {
    ST.token = null; ST.user = null; ST.authVerified = false;
    localStorage.removeItem('ct_token'); localStorage.removeItem('ct_user');
    location.href = '/' + currentLang + '/login';
    return;
  }
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
  // 必须登录才能充值
  if (!ST.token || !ST.authVerified || !ST.user) {
    ST.token = null; ST.user = null; ST.authVerified = false;
    localStorage.removeItem('ct_token'); localStorage.removeItem('ct_user');
    location.href = '/' + currentLang + '/login';
    return;
  }
  const amt = parseFloat($('deposit-amount').value);
  if (!amt || amt <= 0) return errShow('deposit-step2-error', '金额无效');

  try {
    const d = await api.post('/api/auth/deposit', { amount: amt });
    // 用前端翻译，不用后端消息
    var msg = t('deposit_request_submitted').replace('{amount}', amt);
    showToast(msg);
    closeDeposit();
  } catch (e) { errShow('deposit-step2-error', e.message); }
}

// ========== 提现流程 ==========
let withdrawCoin = 'USDT', withdrawNetwork = 'TRC20';
const WITHDRAW_FEES = { USDT: 1, BTC: 0.0005, ETH: 0.005 };
const MIN_WITHDRAW = { USDT: 10, BTC: 0.001, ETH: 0.01 };

function openWithdraw() {
  if (!ST.token || !ST.authVerified || !ST.user) {
    ST.token = null; ST.user = null; ST.authVerified = false;
    localStorage.removeItem('ct_token'); localStorage.removeItem('ct_user');
    location.href = '/' + currentLang + '/login';
    return;
  }
  $('withdraw-modal').classList.remove('hidden');
  $('withdraw-address').value = '';
  $('withdraw-amount').value = '';
  $('withdraw-memo').value = '';
  $('withdraw-error').textContent = '';
  withdrawCoin = 'USDT'; withdrawNetwork = 'TRC20';
  updateWithdrawInfo();
  $$('#withdraw-coin-select .coin-option').forEach(function(o){ o.classList.toggle('active', o.dataset.coin === 'USDT'); });
}

function updateWithdrawInfo() {
  var amt = parseFloat($('withdraw-amount').value) || 0;
  var fee = WITHDRAW_FEES[withdrawCoin] || 1;
  var actual = Math.max(0, amt - fee);
  $('wd-network').textContent = withdrawNetwork;
  $('wd-fee').textContent = fee + ' ' + withdrawCoin;
  $('wd-actual').textContent = actual.toFixed(6) + ' ' + withdrawCoin;
}

function closeWithdraw() {
  $('withdraw-modal').classList.add('hidden');
}

async function submitWithdraw() {
  var addr = $('withdraw-address').value.trim();
  var amt = parseFloat($('withdraw-amount').value);
  var memo = $('withdraw-memo').value.trim();

  if (!addr) return errShow('withdraw-error', '请输入提现地址');
  if (!amt || amt <= 0) return errShow('withdraw-error', '请输入有效金额');
  var minW = MIN_WITHDRAW[withdrawCoin] || 10;
  if (amt < minW) return errShow('withdraw-error', withdrawCoin + ' ' + t('wd_min_withdraw') + ' ' + minW);
  if (addr.length < 20) return errShow('withdraw-error', t('wd_invalid_addr'));

  try {
    var d = await api.post('/api/wallet/withdraw', {
      coin: withdrawCoin, network: withdrawNetwork,
      amount: amt, address: addr, memo: memo
    });
    showToast(d.message);
    closeWithdraw();
    updateNavBalance();
  } catch(e) { errShow('withdraw-error', e.message); }
}

async function loadWithdrawHistory() {
  try {
    var d = await api.get('/api/wallet/withdraw-history');
    var rows = '';
    (d.withdrawals || []).forEach(function(w){
      var sc = w.status === 'approved' ? 'var(--green)' : w.status === 'rejected' ? 'var(--red)' : 'var(--gold)';
      rows += '<tr style="border-bottom:1px solid var(--border)">'
        + '<td style="padding:6px 8px;color:var(--text2);font-size:10px">' + fmtT(w.created_at) + '</td>'
        + '<td style="padding:6px 8px;font-weight:600">' + w.coin + '</td>'
        + '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">' + w.amount + '</td>'
        + '<td style="padding:6px 8px;text-align:right;font-family:var(--mono);color:var(--text2)">' + w.fee + '</td>'
        + '<td style="padding:6px 8px;font-family:var(--mono);font-size:10px;color:var(--text2)">' + (w.address || '').substring(0, 14) + '...</td>'
        + '<td style="padding:6px 8px;color:' + sc + '">' + (w.status === 'approved' ? t('wd_approved') : w.status === 'rejected' ? t('wd_rejected') : t('wd_pending')) + '</td>'
        + '</tr>';
    });
    if (!rows) rows = '<tr><td colspan="6" style="padding:16px;text-align:center;color:var(--text2)">' + t('no_withdrawals') + '</td></tr>';
    $('w-withdraws-body').innerHTML = rows;
  } catch(e){}
}

// ========== 进入交易 ==========
function enterTrade() {
  ST.timers.push(setInterval(updateAll, 8000));
  updateAll();
}

async function updateAll() {
  try {
    const d = await api.get('/api/market/prices');
    ST.prices = d.prices;
    $('price-status').textContent = d.cached ? t('status_cached') : d.warning ? t('status_simulated') : t('status_live');
    demoMode = false;
  } catch (e) {
    // API 不可用时使用演示数据
    ST.prices = _genDemoPrices();
    $('price-status').textContent = t('simulated_data');
    demoMode = true;
  }
  renderMarket();
  updateStat();
  updateOrderbook();
  updateTradeTotal();
  updateTradeInfo();
  updateNavBalance();
  renderTicker();
  loadKline();
  fetchWallet();
  fetchPending();
  fetchOrders();
  if (ST.token && ST.authVerified) fetchNotifications();
}

// ========== 行情滚动条 ==========
function renderTicker() {
  var ctr = $('ticker-inner');
  if (!ctr) return;
  var syms = Object.keys(ST.prices);
  var items = syms.map(function(s) {
    var p = ST.prices[s];
    var cl = (p.change24h || 0) >= 0 ? 'up' : 'down';
    var sg = (p.change24h || 0) >= 0 ? '+' : '';
    return '<span class="ticker-item" data-sym="' + s + '" onclick="selectSymbol(\'' + s + '\')">'
      + '<span class="ticker-sym">' + s + '</span>'
      + '<span class="ticker-price">' + fmtP(p.price) + '</span>'
      + '<span class="ticker-change ' + cl + '">' + sg + (p.change24h || 0).toFixed(2) + '%</span>'
      + '</span>';
  });
  // 双份以实现无缝滚动
  ctr.innerHTML = items.join('') + items.join('');
}

function selectSymbol(sym) {
  ST.symbol = sym;
  ST.klines = [];
  klineLoading = false;
  if (!$('page-trade').classList.contains('hidden')) {
    $$('.subnav-link').forEach(function(l){ l.classList.toggle('active', l.dataset.sym === sym); });
    $$('.market-row').forEach(function(r){ r.classList.toggle('selected', r.dataset.sym === sym); });
    updateStat(); updateOrderbook(); updateTradeTotal(); updateTradeInfo();
    loadKline();
  } else {
    navTo('/trade/' + sym + '_USDT');
  }
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
  if (loading) { loading.textContent = t('chart_loading'); loading.classList.remove('hidden'); }
  if (demoMode) {
    // 演示模式直接使用模拟数据
    ST.klines = _genDemoKlines(ST.symbol, ST.interval);
    ST.crosshair = { index: -1, visible: false };
    var srcEl = $('chart-source');
    if (srcEl) srcEl.textContent = t('simulated_data');
    drawChart();
    if (loading) loading.classList.add('hidden');
    klineLoading = false;
    return;
  }
  try {
    const d = await api.get(`/api/market/kline?symbol=${ST.symbol}&interval=${ST.interval}`);
    ST.klines = d.klines;
    ST.crosshair = { index: -1, visible: false };
    const srcEl = $('chart-source');
    if (srcEl) srcEl.textContent = d.source === 'binance' ? 'Binance' : 'Simulated';
    drawChart();
  } catch (e) {
    ST.klines = _genDemoKlines(ST.symbol, ST.interval);
    ST.crosshair = { index: -1, visible: false };
    var srcEl2 = $('chart-source');
    if (srcEl2) srcEl2.textContent = t('simulated_data');
    drawChart();
  } finally {
    if (loading) loading.classList.add('hidden');
    klineLoading = false;
    clearTimeout(klineTimeout);
  }
}

function _genEmergencyKlines() {
  // 优先用 ST.prices 中当前币种的价格，否则用已知真实价格
  let p = ST.prices[ST.symbol]?.price;
  if (!p || p <= 0) {
    var realPrice = { BTC:87000, ETH:3400, BNB:620, SOL:145, XRP:2.3, ADA:0.7, DOGE:0.17, LINK:14.5, UNI:8.5, ATOM:7, LTC:80, FIL:5, AVAX:37, DOT:6.8, MATIC:0.55 };
    p = realPrice[ST.symbol] || 10;
  }
  var k = [], now = Date.now(), pr = p * 0.95;
  for (var i = 60; i >= 0; i--) {
    var o = pr, v = o * 0.02;
    var h = o + Math.random() * v, l = o - Math.random() * v, c = (h + l) / 2;
    k.push({ time: now - i * 3600000, open: +o.toFixed(2), high: +h.toFixed(2), low: +l.toFixed(2), close: +c.toFixed(2), volume: +(Math.random() * p * 5).toFixed(2) });
    pr = c;
  }
  return k;
}

function calcSMA(period) {
  var closes = ST.klines.map(function(k) { return k.close; });
  var result = new Array(closes.length).fill(null);
  for (var i = period - 1; i < closes.length; i++) {
    var sum = 0;
    for (var j = 0; j < period; j++) sum += closes[i - j];
    result[i] = sum / period;
  }
  return result;
}

function drawChart() {
  const canvas = $('price-chart');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr; canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px'; canvas.style.height = rect.height + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;
  const pad = { top: 20, right: 60, bottom: 40, left: 10 };
  const pw = W - pad.left - pad.right, ph = H - pad.top - pad.bottom;
  if (!ST.klines.length) return;

  const volH = 45, chartH = ph - volH - 2;
  const highs = ST.klines.map(k => k.high), lows = ST.klines.map(k => k.low);
  const maxP = Math.max(...highs), minP = Math.min(...lows), range = maxP - minP || 1;
  const maxV = Math.max(...ST.klines.map(k => k.volume)) || 1;

  ctx.clearRect(0, 0, W, H);

  // 网格
  ctx.strokeStyle = 'rgba(43,49,57,0.5)'; ctx.lineWidth = 0.5;
  for (let i = 0; i <= 5; i++) {
    const y = pad.top + (chartH / 5) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    ctx.fillStyle = '#5E6673'; ctx.font = '10px monospace'; ctx.textAlign = 'right';
    ctx.fillText(fmtP(maxP - (range / 5) * i), W - 4, y + 3);
  }

  // X轴
  const step = Math.max(1, Math.floor(ST.klines.length / 6));
  ctx.textAlign = 'center';
  for (let i = 0; i < ST.klines.length; i += step) {
    const x = pad.left + (pw / (ST.klines.length - 1)) * i;
    const d = new Date(ST.klines[i].time);
    const label = ['1d', '1w'].includes(ST.interval)
      ? `${d.getMonth() + 1}/${d.getDate()}`
      : `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    ctx.fillStyle = '#5E6673'; ctx.font = '9px monospace';
    ctx.fillText(label, x, pad.top + chartH + 14);
  }

  // MA 均线
  var maColors = { 5: '#F0B90B', 10: '#E0529E', 20: '#4572FF', 60: '#808080' };
  [5, 10, 20, 60].forEach(function(period) {
    var maItem = document.querySelector('.ma-item[data-ma="' + period + '"]');
    if (!maItem || !maItem.classList.contains('active')) return;
    var ma = calcSMA(period);
    ctx.strokeStyle = maColors[period];
    ctx.lineWidth = 1;
    ctx.beginPath();
    var started = false;
    for (var i = 0; i < ma.length; i++) {
      if (ma[i] === null) continue;
      var mx = pad.left + (pw / (ST.klines.length - 1)) * i;
      var my = pad.top + chartH * (1 - (ma[i] - minP) / range);
      if (!started) { ctx.moveTo(mx, my); started = true; }
      else ctx.lineTo(mx, my);
    }
    ctx.stroke();
    // 最后一个值标签
    var last = ma[ma.length - 1];
    if (last !== null) {
      var lx = W - pad.right + 2, ly = pad.top + chartH * (1 - (last - minP) / range);
      ctx.fillStyle = maColors[period]; ctx.font = '9px monospace'; ctx.textAlign = 'left';
      ctx.fillText('MA' + period, lx, ly);
    }
  });

  // K线
  const cw = Math.max(1, (pw / ST.klines.length) * 0.7);
  ST.klines.forEach((k, i) => {
    const x = pad.left + (pw / (ST.klines.length - 1)) * i;
    const oy = pad.top + chartH * (1 - (k.open - minP) / range);
    const cy = pad.top + chartH * (1 - (k.close - minP) / range);
    const hy = pad.top + chartH * (1 - (k.high - minP) / range);
    const ly = pad.top + chartH * (1 - (k.low - minP) / range);
    const up = k.close >= k.open;
    const bt = Math.min(oy, cy), bh = Math.max(1, Math.abs(cy - oy));

    ctx.strokeStyle = up ? '#0ECB81' : '#F6465D'; ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(x, hy); ctx.lineTo(x, ly); ctx.stroke();
    ctx.fillStyle = up ? '#0ECB81' : '#F6465D';
    ctx.fillRect(x - cw / 2, bt, cw, bh);
  });

  // 成交量
  const volTop = pad.top + chartH + 4;
  ctx.strokeStyle = 'rgba(43,49,57,0.3)'; ctx.beginPath();
  ctx.moveTo(pad.left, volTop); ctx.lineTo(W - pad.right, volTop); ctx.stroke();

  ST.klines.forEach((k, i) => {
    const x = pad.left + (pw / (ST.klines.length - 1)) * i;
    const vh = (k.volume / maxV) * volH;
    ctx.fillStyle = k.close >= k.open ? 'rgba(14,203,129,0.4)' : 'rgba(246,70,93,0.4)';
    ctx.fillRect(x - cw / 2, volTop + volH - vh, cw, vh);
  });

  // ====== Crosshair 十字线 ======
  if (ST.crosshair && ST.crosshair.visible && ST.crosshair.index >= 0 && ST.crosshair.index < ST.klines.length) {
    var ci = ST.crosshair.index;
    var k = ST.klines[ci];
    var cx = pad.left + (pw / (ST.klines.length - 1)) * ci;

    // 竖线
    ctx.strokeStyle = 'rgba(132,142,156,0.5)'; ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(cx, pad.top); ctx.lineTo(cx, pad.top + chartH); ctx.stroke();
    ctx.setLineDash([]);

    // 横线（在收盘价位置）
    var cy = pad.top + chartH * (1 - (k.close - minP) / range);
    ctx.strokeStyle = 'rgba(132,142,156,0.35)'; ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(pad.left, cy); ctx.lineTo(W - pad.right, cy); ctx.stroke();
    ctx.setLineDash([]);

    // 高亮选中K线
    ctx.save();
    var hiAlpha = 0.55;
    var upH = k.close >= k.open;
    var btH = Math.min(pad.top + chartH * (1 - (k.open - minP) / range), pad.top + chartH * (1 - (k.close - minP) / range));
    var bhH = Math.max(1, Math.abs((k.close - k.open) / range * chartH));
    ctx.fillStyle = upH ? 'rgba(14,203,129,' + hiAlpha + ')' : 'rgba(246,70,93,' + hiAlpha + ')';
    ctx.fillRect(cx - cw / 2 - 1, btH, cw + 2, bhH);
    ctx.strokeStyle = '#EAECEF'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx, pad.top + chartH * (1 - (k.high - minP) / range));
    ctx.lineTo(cx, pad.top + chartH * (1 - (k.low - minP) / range)); ctx.stroke();
    ctx.restore();

    // 更新 tooltip HTML
    var tt = $('chart-tooltip');
    if (tt) {
      var d = new Date(k.time);
      var timeStr = ['1d', '1w'].includes(ST.interval)
        ? (d.getFullYear() + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0'))
        : (d.getMonth() + 1 + '/' + d.getDate() + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'));
      tt.innerHTML = '<div class="chart-tooltip-row"><span class="ct-label">' + t('time_col') + '</span><span class="ct-val">' + timeStr + '</span></div>'
        + '<div class="chart-tooltip-row"><span class="ct-label">O</span><span class="ct-val">' + fmtP(k.open) + '</span></div>'
        + '<div class="chart-tooltip-row"><span class="ct-label">H</span><span class="ct-val">' + fmtP(k.high) + '</span></div>'
        + '<div class="chart-tooltip-row"><span class="ct-label">L</span><span class="ct-val">' + fmtP(k.low) + '</span></div>'
        + '<div class="chart-tooltip-row"><span class="ct-label">C</span><span class="ct-val" style="color:' + (k.close >= k.open ? '#0ECB81' : '#F6465D') + '">' + fmtP(k.close) + '</span></div>'
        + '<div class="chart-tooltip-row"><span class="ct-label">Vol</span><span class="ct-val">' + k.volume.toFixed(2) + '</span></div>';
      // 定位 tooltip（在画布内部右侧或左侧）
      var panelRect = canvas.parentElement.getBoundingClientRect();
      var tooltipX = cx + 15; var tooltipY = pad.top + 5;
      if (cx > W * 0.65) tooltipX = cx - 155;
      if (cy < H * 0.3) tooltipY = cy + 15;
      else tooltipY = Math.max(5, cy - 100);
      tt.style.left = tooltipX + 'px'; tt.style.top = tooltipY + 'px';
      tt.classList.add('visible');
    }
  } else {
    var tt2 = $('chart-tooltip');
    if (tt2) tt2.classList.remove('visible');
  }
}

// ========== 订单簿 ==========
async function updateOrderbook() {
  if (demoMode) {
    ST.orderbook = _genDemoOrderbook(ST.symbol);
    var d = ST.orderbook;
    var ms = Math.max(...d.asks.map(a => a[1]), ...d.bids.map(b => b[1]), 1);
    $('ob-asks').innerHTML = d.asks.slice(0, 10).reverse().map(a =>
      `<div class="ob-row ask"><div class="bar" style="width:${(a[1] / ms * 100).toFixed(1)}%"></div>
      <span>${fmtP(a[0])}</span><span>${a[1].toFixed(4)}</span><span>${a[1].toFixed(4)}</span></div>`
    ).join('');
    $('ob-bids').innerHTML = d.bids.slice(0, 10).map(b =>
      `<div class="ob-row bid"><div class="bar" style="width:${(b[1] / ms * 100).toFixed(1)}%"></div>
      <span>${fmtP(b[0])}</span><span>${b[1].toFixed(4)}</span><span>${b[1].toFixed(4)}</span></div>`
    ).join('');
    var mid = $('ob-mid');
    var price = ST.prices[ST.symbol]?.price || 0;
    mid.textContent = fmtP(price);
    mid.className = 'ob-mid ' + ((ST.prices[ST.symbol]?.change24h || 0) >= 0 ? 'up' : 'down');
    if (d.asks.length && d.bids.length) {
      $('ob-spread').textContent = t('spread') + ' ' + fmtP(d.asks[0][0] - d.bids[0][0]);
    }
    return;
  }
  try {
    const d = await api.get(`/api/market/orderbook?symbol=${ST.symbol}`);
    ST.orderbook = d;
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
    mid.textContent = fmtP(d.lastPrice);
    mid.className = 'ob-mid ' + ((ST.prices[ST.symbol]?.change24h || 0) >= 0 ? 'up' : 'down');
    if (d.asks.length && d.bids.length) {
      $('ob-spread').textContent = t('spread') + ' ' + fmtP(d.asks[0][0] - d.bids[0][0]);
    }
  } catch (e) {
    // 降级到演示数据
    ST.orderbook = _genDemoOrderbook(ST.symbol);
    var d2 = ST.orderbook;
    var ms2 = Math.max(...d2.asks.map(a => a[1]), ...d2.bids.map(b => b[1]), 1);
    $('ob-asks').innerHTML = d2.asks.slice(0, 10).reverse().map(a =>
      `<div class="ob-row ask"><div class="bar" style="width:${(a[1] / ms2 * 100).toFixed(1)}%"></div>
      <span>${fmtP(a[0])}</span><span>${a[1].toFixed(4)}</span><span>${a[1].toFixed(4)}</span></div>`
    ).join('');
    $('ob-bids').innerHTML = d2.bids.slice(0, 10).map(b =>
      `<div class="ob-row bid"><div class="bar" style="width:${(b[1] / ms2 * 100).toFixed(1)}%"></div>
      <span>${fmtP(b[0])}</span><span>${b[1].toFixed(4)}</span><span>${b[1].toFixed(4)}</span></div>`
    ).join('');
    var mid2 = $('ob-mid');
    var price2 = ST.prices[ST.symbol]?.price || 0;
    mid2.textContent = fmtP(price2);
    mid2.className = 'ob-mid ' + ((ST.prices[ST.symbol]?.change24h || 0) >= 0 ? 'up' : 'down');
    if (d2.asks.length && d2.bids.length) {
      $('ob-spread').textContent = t('spread') + ' ' + fmtP(d2.asks[0][0] - d2.bids[0][0]);
    }
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
  if (demoMode) {
    if (ST.token && ST.authVerified && ST.user) {
      $('available-usdt').textContent = '10,000.00 USDT';
      $('holding-info').textContent = '0.5000 ' + ST.symbol;
      return;
    }
    $('available-usdt').textContent = '0.00 USDT';
    $('holding-info').textContent = '0.0000 ' + ST.symbol;
    return;
  }
  try {
    const d = await api.get('/api/auth/profile');
    const a = d.assets.find(x => x.symbol === ST.symbol);
    $('available-usdt').textContent = d.user.usdt_balance.toFixed(2) + ' USDT';
    $('holding-info').textContent = (a ? a.balance.toFixed(6) : '0') + ' ' + ST.symbol;
    if (ST.user) ST.user.usdt_balance = d.user.usdt_balance;
  } catch (e) { /* ignore */ }
}

async function executeTrade() {
  // 未登录用户跳转到登录页
  if (!ST.token || !ST.authVerified || !ST.user) {
    ST.token = null; ST.user = null; ST.authVerified = false;
    localStorage.removeItem('ct_token'); localStorage.removeItem('ct_user');
    location.href = '/' + currentLang + '/login?redirect=' + encodeURIComponent(location.pathname);
    return;
  }
  const sym = ST.symbol;
  const price = ST.orderType === 'market' ? (ST.prices[sym]?.price || 0) : (parseFloat($('trade-price-input').value) || 0);
  const amt = parseFloat($('trade-amount').value);
  if (!amt || amt <= 0) return errShow('trade-error', '请输入有效数量');
  if (!price || price <= 0) return errShow('trade-error', '价格无效');

  if (ST.side === 'buy' && ((ST.user?.usdt_balance || 0) <= 0)) {
    return errShow('trade-error', t('insufficient'));
  }

  try {
    var body = { symbol: sym, amount: amt, price, type: ST.orderType };
    if (ST.orderType === 'stop_limit') {
      var stopPrice = parseFloat($('trade-stop-price').value) || 0;
      if (!stopPrice || stopPrice <= 0) return errShow('trade-error', '请输入有效的触发价格');
      body.stop_price = stopPrice;
      body.trigger_condition = ST.side === 'buy' ? 'gte' : 'lte';
    }
    const d = await api.post(ST.side === 'buy' ? '/api/trade/buy' : '/api/trade/sell', body);
    var side = ST.side === 'buy' ? t('buy') : t('sell');
    showToast(side + ' ' + amt + ' ' + sym + (d.status === 'pending' ? ' (' + t('pending') + ')' : ''));
    $('trade-amount').value = '';
    if (ST.orderType === 'limit' || ST.orderType === 'stop_limit') { $('trade-price-input').value = ''; $('trade-stop-price').value = ''; }
    updateTradeTotal(); updateTradeInfo(); updateNavBalance(); fetchWallet(); fetchOrders(); fetchPending();
  } catch (e) { errShow('trade-error', e.message); }
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
  if (demoMode) {
    if (ST.token && ST.authVerified && ST.user) {
      $('wallet-usdt').textContent = '10,000.00';
      $('wallet-total').textContent = '12,500.00';
      var c = $('wallet-assets');
      c.innerHTML = '<div class="asset-row"><span class="asset-sym">BTC</span><span class="asset-bal">0.0500</span><span class="asset-val">@87,500</span></div>'
        + '<div class="asset-row"><span class="asset-sym">ETH</span><span class="asset-bal">0.5000</span><span class="asset-val">@3,420</span></div>';
      return;
    }
    // 未登录用户显示 0 余额
    $('wallet-usdt').textContent = '0.00';
    $('wallet-total').textContent = '0.00';
    $('wallet-assets').innerHTML = '<div class="empty-hint" data-i18n="no_data">None</div>';
    return;
  }
  try {
    const d = await api.get('/api/wallet/balance');
    $('wallet-usdt').textContent = d.usdt_balance.toFixed(2);
    $('wallet-total').textContent = d.total_value.toFixed(2);
    const c = $('wallet-assets');
    if (!d.assets.length) { c.innerHTML = '<div class="empty-hint">' + t('no_holdings') + '</div>'; return; }
    c.innerHTML = d.assets.map(a =>
      `<div class="asset-row"><span class="asset-sym">${a.symbol}</span><span class="asset-bal">${a.balance.toFixed(4)}</span><span class="asset-val">@${fmtP(a.avg_price)}</span></div>`
    ).join('');
  } catch (e) { /* ignore */ }
}

// ========== 订单 ==========
async function fetchOrders() {
  try {
    const d = await api.get('/api/trade/orders?limit=30&status=filled');
    const b = $('orders-body');
    if (!d.orders.length) { b.innerHTML = '<tr><td colspan="8" class="empty-hint">' + t('no_orders_yet') + '</td></tr>'; }
    else b.innerHTML = d.orders.map(o =>
      `<tr><td>${fmtT(o.created_at)}</td><td>${o.symbol}/USDT</td>
      <td class="side-${o.side}">${t(o.side)}</td>
      <td>${fmtP(o.price)}</td><td>${o.amount.toFixed(4)}</td><td>${o.total.toFixed(2)}</td>
      <td>${t(o.type === 'market' ? 'trade_market' : 'trade_limit')}</td>
      <td class="status-${o.status}">${o.status === 'filled' ? t('status_filled') : o.status === 'pending' ? t('status_pending') : t('status_cancelled2')}</td></tr>`
    ).join('');
  } catch (e) { /* ignore */ }

  try {
    const tx = await api.get('/api/wallet/transactions?limit=30');
    const b = $('transactions-body');
    if (!tx.transactions.length) { b.innerHTML = '<tr><td colspan="8" class="empty-hint">' + t('no_records') + '</td></tr>'; }
    else b.innerHTML = tx.transactions.map(t =>
      `<tr><td>${fmtT(t.created_at)}</td><td>${t.symbol}</td>
      <td class="${t.type === 'deposit' ? 'side-buy' : t.type === 'buy' ? 'side-buy' : t.type === 'sell' ? 'side-sell' : ''}">${t.type === 'deposit' ? t('deposit') : t.type === 'buy' ? t('buy') : t('sell')}</td>
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
    $('pending-badge').textContent = cnt + ' ' + t('pending');

    const list = $('pending-list');
    if (!cnt) { list.innerHTML = '<div class="empty-hint">' + t('no_orders_yet') + '</div>'; return; }
    list.innerHTML = d.orders.map(o =>
      `<div class="pending-item"><span class="p-side ${o.side}">${t(o.side === 'buy' ? 'buy_short' : 'sell_short')}</span>
      <span class="p-info">${o.symbol} ${o.amount} @${fmtP(o.price)}</span>
      <span class="p-time">${fmtT(o.created_at)}</span>
      <button class="btn-cancel" data-id="${o.id}">${t('cancel')}</button></div>`
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

// ========== C2C 交易 ==========
const C2C = {
  filterSide: 'all',
  filterCoin: 'USDT',
  filterPayment: '',
  currentAd: null,
  currentOrder: null,
  chatTimer: null
};

function showC2C() {
  $$('.page-auth,.page-trade,.page-generic,.page-c2c').forEach(function(p){ p.classList.add('hidden'); });
  $('page-c2c').classList.remove('hidden');
  updateNavAuth(!!ST.token);
  highlightNav('/c2c');
  document.title = 'C2C P2P | CoinUSDT C2C';
  loadC2CAds();
  setTimeout(function(){ applyLang(); }, 100);
}

async function loadC2CAds() {
  var body = $('c2c-ads-body');
  body.innerHTML = '<div class="empty-hint" style="padding:40px">' + t('loading') + '</div>';
  if (demoMode) {
    // 演示模式生成假广告
    var demoAds = [];
    var merchants = ['CryptoKing', 'FastTrade', 'USDTPro', 'GoldenCoin', 'BTC Master', 'TradeExpert'];
    var coins = ['USDT', 'USDT', 'USDT', 'USDT', 'BTC', 'ETH'];
    for (var i = 0; i < 6; i++) {
      demoAds.push({
        id: 1000 + i,
        user_id: 100 + i,
        username: merchants[i],
        coin: coins[i],
        side: i < 3 ? 'sell' : 'buy',
        price: i < 3 ? 7.25 + i * 0.02 : 7.22 - i * 0.01,
        min_amount: 100 + i * 50,
        max_amount: 5000 + i * 1000,
        payment_methods: i % 3 === 0 ? 'bank' : i % 3 === 1 ? 'alipay,wechat' : 'bank,alipay,wechat',
        vip_level: i % 2 === 0 ? 2 : 1
      });
    }
    body.innerHTML = demoAds.map(function(a) {
      var payTags = a.payment_methods.split(',').map(function(m) {
        var label = m === 'bank' ? t('c2c_pay_bank') : m === 'alipay' ? t('c2c_pay_alipay') : m === 'wechat' ? t('c2c_pay_wechat') : m;
        return '<span class="c2c-pay-tag">' + label + '</span>';
      }).join('');
      var avatarColor = a.side === 'sell' ? 'rgba(246,70,93,0.2)' : 'rgba(14,203,129,0.2)';
      var avatarText = a.side === 'sell' ? 'S' : 'B';
      var priceClass = a.side === 'sell' ? 'sell-color' : 'buy-color';
      return '<div class="c2c-ad-row" data-ad-id="' + a.id + '" data-user-id="' + a.user_id + '">' +
        '<div class="c2c-ad-merchant">' +
          '<div class="c2c-ad-merchant-avatar" style="background:' + avatarColor + ';color:' + (a.side==='sell'?'var(--red)':'var(--green)') + '">' + avatarText + '</div>' +
          '<div class="c2c-ad-merchant-info">' +
            '<span class="c2c-ad-merchant-name">' + a.username + '</span>' +
            '<span class="c2c-ad-merchant-sub">' + (a.vip_level > 0 ? 'VIP' + a.vip_level : '') + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="c2c-ad-amount">' + a.min_amount + ' - ' + a.max_amount + '<span class="amt-range">' + a.coin + '</span></div>' +
        '<div class="c2c-ad-price ' + priceClass + '">¥' + a.price.toFixed(2) + '</div>' +
        '<div class="c2c-ad-payment">' + payTags + '</div>' +
        '<div class="c2c-ad-action">' +
          '<button class="btn btn-xs btn-gold c2c-take-ad-btn" data-id="' + a.id + '">' + t('c2c_take_order') + '</button>' +
        '</div>' +
      '</div>';
    }).join('');
    body.querySelectorAll('.c2c-take-ad-btn').forEach(function(b) {
      b.addEventListener('click', function() {
        if (!ST.token) { location.href = '/' + currentLang + '/login'; return; }
        showToast(t('please_login'));
      });
    });
    return;
  }
  try {
    var params = '?coin=' + C2C.filterCoin;
    if (C2C.filterSide !== 'all') params += '&side=' + C2C.filterSide;
    if (C2C.filterPayment) params += '&payment=' + C2C.filterPayment;
    var minAmt = parseFloat($('c2c-amount-filter').value) || 0;
    if (minAmt > 0) params += '&min_amount=' + minAmt;
    var ads = await api.get('/api/c2c/ads' + params);
    if (!ads.length) {
      body.innerHTML = '<div class="empty-hint" style="padding:40px">' + t('c2c_no_ads') + '</div>';
      return;
    }
    body.innerHTML = ads.map(function(a) {
      var payTags = a.payment_methods.split(',').map(function(m) {
        var label = m === 'bank' ? t('c2c_pay_bank') : m === 'alipay' ? t('c2c_pay_alipay') : m === 'wechat' ? t('c2c_pay_wechat') : m;
        return '<span class="c2c-pay-tag">' + label + '</span>';
      }).join('');
      var avatarColor = a.side === 'sell' ? 'rgba(246,70,93,0.2)' : 'rgba(14,203,129,0.2)';
      var avatarText = a.side === 'sell' ? 'S' : 'B';
      var priceClass = a.side === 'sell' ? 'sell-color' : 'buy-color';
      var mine = ST.user && a.user_id === ST.user.id;
      return '<div class="c2c-ad-row" data-ad-id="' + a.id + '" data-user-id="' + a.user_id + '">' +
        '<div class="c2c-ad-merchant">' +
          '<div class="c2c-ad-merchant-avatar" style="background:' + avatarColor + ';color:' + (a.side==='sell'?'var(--red)':'var(--green)') + '">' + avatarText + '</div>' +
          '<div class="c2c-ad-merchant-info">' +
            '<span class="c2c-ad-merchant-name">' + a.username + (mine ? ' (you)' : '') + '</span>' +
            '<span class="c2c-ad-merchant-sub">' + (a.vip_level > 0 ? 'VIP' + a.vip_level : '') + '</span>' +
            '<span class="c2c-ad-merchant-rating" id="ad-rating-' + a.user_id + '" style="display:none"></span>' +
          '</div>' +
        '</div>' +
        '<div class="c2c-ad-amount">' + a.min_amount + ' - ' + a.max_amount + '<span class="amt-range">' + a.coin + '</span></div>' +
        '<div class="c2c-ad-price ' + priceClass + '">¥' + a.price.toFixed(2) + '</div>' +
        '<div class="c2c-ad-payment">' + payTags + '</div>' +
        '<div class="c2c-ad-action">' +
          (mine ? '<button class="btn btn-xs btn-outline c2c-cancel-ad-btn" data-id="' + a.id + '">Cancel</button>' :
           '<button class="btn btn-xs btn-gold c2c-take-ad-btn" data-id="' + a.id + '">' + t('c2c_take_order') + '</button>') +
        '</div>' +
      '</div>';
    }).join('');

    // 批量加载商家信誉评价
    (function() {
      var userIds = ads.map(function(a) { return a.user_id; }).filter(function(id) { return id !== (ST.user || {}).id; });
      var uniqueIds = userIds.filter(function(id, i, arr) { return arr.indexOf(id) === i; });
      uniqueIds.forEach(function(uid) {
        api.get('/api/c2c/reviews/' + uid + '?limit=1').then(function(r) {
          var el = $('ad-rating-' + uid);
          if (!el || !r || !r.total_reviews) return;
          el.style.display = 'flex';
          var starsText = '';
          var avgR = Math.round(r.avg_rating);
          for (var si = 1; si <= 5; si++) { starsText += si <= avgR ? '★' : '☆'; }
          el.innerHTML = '<span class="c2c-avg-star">' + starsText + '</span>'
            + '<span style="color:var(--text);">' + r.avg_rating + '</span>'
            + '<span class="c2c-review-count">(' + r.total_reviews + ')</span>';
        }).catch(function() {});
      });
    })();

    // 绑定接单事件
    body.querySelectorAll('.c2c-take-ad-btn').forEach(function(b) {
      b.addEventListener('click', function() { openTakeAd(parseInt(this.dataset.id)); });
    });
    body.querySelectorAll('.c2c-cancel-ad-btn').forEach(function(b) {
      b.addEventListener('click', function() { cancelMyAd(parseInt(this.dataset.id)); });
    });
  } catch(e) { body.innerHTML = '<div class="empty-hint" style="padding:40px">' + t('error_loading') + '</div>'; }
}

async function openTakeAd(adId) {
  if (!ST.token) { location.href = '/' + currentLang + '/login'; return; }
  var amt = parseFloat(prompt(t('c2c_enter_amount') + ' (USDT):', '100'));
  if (!amt || amt <= 0) return;
  try {
    var d = await api.post('/api/c2c/ads/' + adId + '/take', { amount: amt });
    showToast(d.message);
    loadC2CAds();
  } catch(e) { showToast(e.message); }
}

async function cancelMyAd(adId) {
  if (!confirm(t('confirm_cancel_ad'))) return;
  try {
    await api.req('/api/c2c/ads/' + adId, { method: 'DELETE' });
    showToast(t('ad_cancelled'));
    loadC2CAds();
  } catch(e) { showToast(e.message); }
}

// ====== 发布广告弹窗 ======
function openCreateAd() {
  if (!ST.token) { location.href = '/' + currentLang + '/login'; return; }
  $('c2c-ad-modal').classList.remove('hidden');
  $('c2c-ad-error').textContent = '';
  $('c2c-ad-price').value = '';
  $('c2c-ad-min').value = '';
  $('c2c-ad-max').value = '';
  $('c2c-ad-remark').value = '';
}

async function submitAd() {
  var side = document.querySelector('.c2c-ad-type-btn.active').dataset.type;
  var coin = $('c2c-ad-coin').value;
  var price = parseFloat($('c2c-ad-price').value);
  var min = parseFloat($('c2c-ad-min').value);
  var max = parseFloat($('c2c-ad-max').value);
  var payments = [];
  document.querySelectorAll('.c2c-pay-check input:checked').forEach(function(c) { payments.push(c.value); });
  var remark = $('c2c-ad-remark').value.trim();

  if (!price || price <= 0) return errShow('c2c-ad-error', '请输入有效价格');
  if (!min || min <= 0 || !max || max <= 0) return errShow('c2c-ad-error', '请输入有效金额范围');
  if (min > max) return errShow('c2c-ad-error', '最小金额不能大于最大金额');
  if (!payments.length) return errShow('c2c-ad-error', '请选择支付方式');

  try {
    await api.post('/api/c2c/ads', {
      coin: coin, side: side, price: price,
      min_amount: min, max_amount: max,
      payment_methods: payments, remark: remark
    });
    $('c2c-ad-modal').classList.add('hidden');
    showToast(t('ad_published'));
    loadC2CAds();
  } catch(e) { errShow('c2c-ad-error', e.message); }
}

// ====== 订单详情/聊天弹窗 ======
async function openOrderChat(orderId) {
  if (!ST.token) { location.href = '/' + currentLang + '/login'; return; }
  $('c2c-order-modal').classList.remove('hidden');
  $('c2c-chat-input').value = '';

  try {
    // 获取我的订单列表找到这个订单
    var orders = await api.get('/api/c2c/orders?limit=50');
    var order = orders.find(function(o) { return o.order_id === orderId; });
    if (!order) { showToast(t('order_not_found')); return; }
    C2C.currentOrder = order;

    // 渲染订单信息
    $('c2c-order-title').textContent = 'C2C #' + order.order_id.substring(0, 16) + '...';
    $('c2c-oi-amount').textContent = order.amount + ' ' + order.coin;
    $('c2c-oi-price').textContent = '¥' + order.price.toFixed(2);
    $('c2c-oi-total').textContent = order.total + ' USDT';
    $('c2c-oi-payment').textContent = order.payment_methods;

    // 更新状态进度条
    updateOrderStatus(order);

    // 更新操作按钮
    updateOrderActions(order);

    // 加载聊天
    loadChatMessages(order.order_id);
  } catch(e) { showToast(e.message); }
}

function updateOrderStatus(order) {
  // 重置所有步骤
  ['c2c-step-pay', 'c2c-step-release', 'c2c-step-done'].forEach(function(s) {
    $(s).className = 'c2c-status-step';
  });
  ['c2c-conn-1', 'c2c-conn-2'].forEach(function(c) {
    $(c).className = 'c2c-status-conn';
  });

  if (order.status === 'pending_payment') {
    $('c2c-step-pay').classList.add('active');
  } else if (order.status === 'pending_release') {
    $('c2c-step-pay').classList.add('done');
    $('c2c-conn-1').classList.add('done');
    $('c2c-step-release').classList.add('active');
  } else if (order.status === 'completed') {
    $('c2c-step-pay').classList.add('done');
    $('c2c-conn-1').classList.add('done');
    $('c2c-step-release').classList.add('done');
    $('c2c-conn-2').classList.add('done');
    $('c2c-step-done').classList.add('done');
  } else if (order.status === 'cancelled') {
    $('c2c-step-pay').style.color = 'var(--red)';
    $('c2c-step-release').style.color = 'var(--red)';
    $('c2c-step-done').style.color = 'var(--red)';
  }
}

function updateOrderActions(order) {
  var uid = ST.user ? ST.user.id : 0;
  var isBuyer = order.buyer_id === uid;
  var isSeller = order.seller_id === uid;
  var actions = $('c2c-order-actions');
  var html = '';

  if (order.status === 'pending_payment' && isBuyer) {
    html += '<button class="btn btn-buy" onclick="confirmC2CPayment(\'' + order.order_id + '\')">' + t('c2c_confirm_pay') + '</button>';
  }
  if (order.status === 'pending_release' && isSeller) {
    html += '<button class="btn btn-buy" onclick="releaseC2CCrypto(\'' + order.order_id + '\')">' + t('c2c_release') + '</button>';
  }
  if (order.status === 'pending_payment' || order.status === 'pending_release') {
    html += '<button class="btn btn-outline" onclick="cancelC2COrder(\'' + order.order_id + '\')">' + t('c2c_cancel_order') + '</button>';
    html += '<button class="btn btn-outline" style="color:var(--red);border-color:var(--red)" onclick="disputeC2COrder(\'' + order.order_id + '\')">' + t('c2c_dispute') + '</button>';
  }
  if (order.status === 'completed') {
    html += '<span style="color:var(--green);font-weight:600">' + t('trade_completed') + '</span>';
    if (!order.reviewed) {
      html += '<button class="btn btn-xs btn-gold-outline" style="margin-left:8px" onclick="openRatingModal(\'' + order.order_id + '\')">' + t('review') + '</button>';
    }
  }
  if (order.status === 'cancelled') {
    html += '<span style="color:var(--red);font-weight:600">' + t('order_cancelled_text') + '</span>';
  }
  if (order.status === 'disputed') {
    html += '<span style="color:var(--gold);font-weight:600">' + t('disputed_pending') + '</span>';
  }

  actions.innerHTML = html;
}

async function confirmC2CPayment(orderId) {
  if (!confirm(t('c2c_confirm_pay_prompt'))) return;
  try {
    await api.post('/api/c2c/orders/' + orderId + '/pay');
    showToast(t('c2c_pay_confirmed'));
    openOrderChat(orderId);
  } catch(e) { showToast(e.message); }
}

async function releaseC2CCrypto(orderId) {
  if (!confirm(t('c2c_release_confirm'))) return;
  try {
    await api.post('/api/c2c/orders/' + orderId + '/release');
    showToast(t('c2c_release_success'));
    openOrderChat(orderId);
    updateNavBalance();
  } catch(e) { showToast(e.message); }
}

async function cancelC2COrder(orderId) {
  if (!confirm(t('c2c_cancel_order_prompt'))) return;
  try {
    await api.post('/api/c2c/orders/' + orderId + '/cancel');
    showToast(t('c2c_order_cancelled'));
    $('c2c-order-modal').classList.add('hidden');
    loadC2CAds();
  } catch(e) { showToast(e.message); }
}

async function disputeC2COrder(orderId) {
  var reason = prompt(t('c2c_dispute_prompt'), '');
  if (!reason || !reason.trim()) return;
  try {
    await api.post('/api/c2c/orders/' + orderId + '/dispute', { reason: reason });
    showToast(t('c2c_dispute_submitted'));
    openOrderChat(orderId);
  } catch(e) { showToast(e.message); }
}

// ====== 聊天 ======
async function loadChatMessages(orderId) {
  if (C2C.chatTimer) clearInterval(C2C.chatTimer);
  var refreshChat = function() {
    api.get('/api/c2c/orders/' + orderId + '/messages').then(function(msgs) {
      var ct = $('c2c-chat-msgs');
      var uid = ST.user ? ST.user.id : 0;
      if (!msgs.length) {
        ct.innerHTML = '<div class="c2c-msg-system">—— ' + t('no_messages_yet') + ' ——</div>';
      } else {
        ct.innerHTML = msgs.map(function(m) {
          if (m.user_id === uid) {
            return '<div class="c2c-msg mine"><div class="c2c-msg-sender">' + m.username + '</div><div class="c2c-msg-content">' + m.content + '</div></div>';
          }
          return '<div class="c2c-msg"><div class="c2c-msg-sender">' + m.username + '</div><div class="c2c-msg-content">' + m.content + '</div></div>';
        }).join('');
      }
      ct.scrollTop = ct.scrollHeight;
    }).catch(function() {});
  };
  refreshChat();
  C2C.chatTimer = setInterval(refreshChat, 3000);
}

async function sendChatMsg() {
  var input = $('c2c-chat-input');
  var content = input.value.trim();
  if (!content || !C2C.currentOrder) return;
  try {
    await api.post('/api/c2c/orders/' + C2C.currentOrder.order_id + '/messages', { content: content });
    input.value = '';
    loadChatMessages(C2C.currentOrder.order_id);
  } catch(e) { showToast(e.message); }
}

// ====== 我的订单弹窗 ======
async function openMyOrders() {
  if (!ST.token) { location.href = '/' + currentLang + '/login'; return; }
  $('c2c-my-orders-modal').classList.remove('hidden');
  var body = $('c2c-my-orders-body');
  body.innerHTML = '<tr><td colspan="7" class="empty-hint">' + t('loading') + '</td></tr>';
  try {
    var orders = await api.get('/api/c2c/orders?limit=100');
    if (!orders.length) {
      body.innerHTML = '<tr><td colspan="7" class="empty-hint">' + t('no_c2c_orders') + '</td></tr>';
      return;
    }
    var uid = ST.user.id;
    body.innerHTML = orders.map(function(o) {
      var statusColor = o.status === 'completed' ? 'var(--green)' : o.status === 'cancelled' ? 'var(--red)' : o.status === 'disputed' ? 'var(--gold)' : 'var(--text2)';
      var statusLabel = o.status === 'pending_payment' ? t('status_pending_pay') : o.status === 'pending_release' ? t('status_pending_release') : o.status === 'disputed' ? t('status_disputed') : o.status === 'completed' ? t('c2c_status_completed') : o.status === 'cancelled' ? t('cancelled') : o.status;
      var isBuyer = o.buyer_id === uid;
      return '<tr style="border-bottom:1px solid rgba(255,255,255,.03)">' +
        '<td style="padding:6px 8px;font-size:11px;font-family:var(--mono);color:var(--text2)">#' + o.order_id.substring(0, 12) + '</td>' +
        '<td style="padding:6px 8px">' + o.coin + '</td>' +
        '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">' + o.amount + '</td>' +
        '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">¥' + o.price.toFixed(2) + '</td>' +
        '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">' + o.total + ' USDT</td>' +
        '<td style="padding:6px 8px;color:' + statusColor + '">' + statusLabel + '</td>' +
        '<td style="padding:6px 8px;text-align:center">' +
          ((o.status !== 'completed' && o.status !== 'cancelled') ?
           '<button class="btn btn-xs btn-gold-outline" onclick="openOrderChat(\'' + o.order_id + '\')">' + t('c2c_chat_with') + '</button>' : '') +
        '</td>' +
        '</tr>';
    }).join('');
  } catch(e) { body.innerHTML = '<tr><td colspan="7" class="empty-hint">' + t('error_loading') + '</td></tr>'; }
}

// ====== 我的广告弹窗 ======
async function openMyAds() {
  if (!ST.token) { location.href = '/' + currentLang + '/login'; return; }
  $('c2c-my-ads-modal').classList.remove('hidden');
  var body = $('c2c-my-ads-body');
  body.innerHTML = '<tr><td colspan="8" class="empty-hint">' + t('loading') + '</td></tr>';
  try {
    var ads = await api.get('/api/c2c/ads/mine?limit=50');
    if (!ads.length) {
      body.innerHTML = '<tr><td colspan="8" class="empty-hint">' + t('c2c_no_ads') + '</td></tr>';
      return;
    }
    body.innerHTML = ads.map(function(a) {
      var statusTag = a.status === 'active' ? '<span class="c2c-ad-status-tag active">' + a.status + '</span>'
        : a.status === 'cancelled' ? '<span class="c2c-ad-status-tag cancelled">' + a.status + '</span>'
        : '<span class="c2c-ad-status-tag completed">' + a.status + '</span>';
      var payMethods = (a.payment_methods || '').split(',').map(function(m) {
        var label = m === 'bank' ? t('c2c_pay_bank') : m === 'alipay' ? t('c2c_pay_alipay') : m === 'wechat' ? t('c2c_pay_wechat') : m;
        return '<span class="c2c-pay-tag">' + label + '</span>';
      }).join(' ');
      var typeStyle = a.side === 'buy' ? 'color:var(--green)' : 'color:var(--red)';
      return '<tr style="border-bottom:1px solid rgba(255,255,255,.03)">'
        + '<td style="padding:6px 8px;font-size:10px;color:var(--text3)">#' + a.id + '</td>'
        + '<td style="padding:6px 8px;font-weight:600;' + typeStyle + '">' + (a.side === 'buy' ? t('buy') : t('sell')) + '</td>'
        + '<td style="padding:6px 8px;font-family:var(--mono)">' + a.coin + '</td>'
        + '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">¥' + a.price.toFixed(2) + '</td>'
        + '<td style="padding:6px 8px;text-align:right;font-family:var(--mono)">' + a.min_amount + ' - ' + a.max_amount + '</td>'
        + '<td style="padding:6px 8px;font-size:10px">' + payMethods + '</td>'
        + '<td style="padding:6px 8px">' + statusTag + '</td>'
        + '<td style="padding:6px 8px;text-align:center">'
        + (a.status === 'active' ? '<button class="btn btn-xs btn-outline" style="color:var(--red);border-color:var(--red)" onclick="cancelMyAd(' + a.id + ');openMyAds()">' + t('cancel') + '</button>' : '')
        + '</td></tr>';
    }).join('');
  } catch(e) { body.innerHTML = '<tr><td colspan="8" class="empty-hint">' + t('error_loading') + '</td></tr>'; }
}

// ========== 通知系统 ==========
var notifPollTimer = null;
async function fetchNotifications() {
  try {
    var d = await api.get('/api/auth/notifications?limit=20&unread=1');
    var badge = $('notif-badge');
    var bell = $('notif-bell');
    if (bell) bell.classList.remove('hidden');
    var unread = d.unread_count || (d.notifications || []).filter(function(n){ return !n.is_read; }).length;
    if (badge) {
      badge.textContent = unread;
      badge.classList.toggle('empty', unread === 0);
    }
  } catch(e) {}
}

async function loadNotificationsList() {
  try {
    var d = await api.get('/api/auth/notifications?limit=30');
    var list = $('notif-list');
    var items = d.notifications || [];
    if (!items.length) {
      list.innerHTML = '<div class="notif-item"><div class="notif-body" style="text-align:center;color:var(--text3)">No notifications</div></div>';
      return;
    }
    list.innerHTML = items.map(function(n) {
      var time = new Date(n.created_at);
      var timeStr = time.toLocaleString();
      return '<div class="notif-item' + (n.is_read ? '' : ' unread') + '" data-id="' + n.id + '">'
        + '<div class="notif-title">' + (n.title || t('notifications')) + '</div>'
        + '<div class="notif-body">' + (n.message || n.content || '') + '</div>'
        + '<div class="notif-time">' + timeStr + '</div>'
        + '</div>';
    }).join('');
    // 点击标记已读
    list.querySelectorAll('.notif-item.unread').forEach(function(item) {
      item.addEventListener('click', function() {
        markNotifRead(parseInt(this.dataset.id));
        this.classList.remove('unread');
      });
    });
  } catch(e) {
    $('notif-list').innerHTML = '<div class="notif-item"><div class="notif-body" style="text-align:center;color:var(--text3)">' + t('error_loading') + '</div></div>';
  }
}

async function markNotifRead(id) {
  try { await api.post('/api/auth/notifications/read', { id: id }); fetchNotifications(); } catch(e) {}
}

async function markAllNotifsRead() {
  try { await api.post('/api/auth/notifications/read', {}); fetchNotifications(); loadNotificationsList(); } catch(e) {}
}

function toggleNotifDropdown() {
  var dd = $('notif-dropdown');
  var isHidden = dd.classList.contains('hidden');
  if (isHidden) {
    dd.classList.remove('hidden');
    loadNotificationsList();
  } else {
    dd.classList.add('hidden');
  }
}

// ========== 2FA 开关 ==========
async function toggle2FA() {
  var check = $('set-2fa-check');
  var toggle = $('set-2fa-toggle');
  var enable = check.checked;
  try {
    var d = await api.post('/api/auth/enable-2fa', { enable: enable });
    toggle.classList.toggle('active', enable);
    showToast(enable ? t('2fa_enabled') : t('2fa_disabled'));
  } catch(e) {
    check.checked = !enable;
    showToast(e.message);
  }
}

// SPA 链接拦截
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript')) return;
  if (href.startsWith('/api/')) return;
  if (a.target === '_blank' || a.hasAttribute('download')) return;

  e.preventDefault();
  if (href.match(/^\/(en|zh-CN|zh-TW|ja|ko|es|ru|fr|de|pt|vi|th)\//)) {
    history.pushState(null, '', href);
    route();
    return;
  }
  navTo(href);
});

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
  // 处理 404 重定向（GitHub Pages SPA fallback）
  var _redirectPath = sessionStorage.getItem('ct_redirect');
  if (_redirectPath) {
    sessionStorage.removeItem('ct_redirect');
    _redirectPath = _redirectPath.replace(/^\/(en|zh-CN|zh-TW|ja|ko|es|ru|fr|de|pt|vi|th)\//, '/');
    if (_redirectPath === '/' || _redirectPath === '') _redirectPath = '/trade/BTC_USDT';
  }

  // 恢复语言
  applyLang();

  // 点击空白关闭语言下拉
  document.addEventListener('click', function(e){
    if (!e.target.closest('#lang-switch')){
      var d = document.getElementById('lang-drop');
      if (d) d.classList.add('hidden');
    }
  });

  // 初始路由 — 优先处理 404 fallback 重定向
  if (_redirectPath) {
    var _rp = _redirectPath;
    _redirectPath = null;  // 清空，避免后续 _doRoute 重复跳转
    navTo(_rp);
  } else {
    route();
  }

  // 浏览器后退/前进
  window.addEventListener('popstate', route);

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
    $('limit-price-row').style.display = (type === 'limit' || type === 'stop_limit') ? '' : 'none';
    $('stop-price-row').style.display = type === 'stop_limit' ? '' : 'none';
    if ((type === 'limit' || type === 'stop_limit') && !$('trade-price-input').value)
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

  // ===== C2C 事件 =====
  $('c2c-create-ad-btn')?.addEventListener('click', openCreateAd);
  $('c2c-my-orders-btn')?.addEventListener('click', openMyOrders);
  $('c2c-my-ads-btn')?.addEventListener('click', openMyAds);

  // 筛选按钮
  $$('.c2c-filter-btn').forEach(function(b) {
    b.addEventListener('click', function() {
      $$('.c2c-filter-btn').forEach(function(x) { x.classList.remove('active'); });
      this.classList.add('active');
      C2C.filterSide = this.dataset.side;
      loadC2CAds();
    });
  });

  $('c2c-coin-filter')?.addEventListener('change', function() {
    C2C.filterCoin = this.value;
    loadC2CAds();
  });
  $('c2c-payment-filter')?.addEventListener('change', function() {
    C2C.filterPayment = this.value;
    loadC2CAds();
  });
  $('c2c-filter-btn')?.addEventListener('click', function() {
    loadC2CAds();
  });
  $('c2c-amount-filter')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') loadC2CAds();
  });

  // 广告弹窗
  $('c2c-ad-close')?.addEventListener('click', function() {
    $('c2c-ad-modal').classList.add('hidden');
  });
  $('c2c-ad-modal')?.addEventListener('click', function(e) {
    if (e.target === this) $('c2c-ad-modal').classList.add('hidden');
  });
  $('c2c-ad-submit')?.addEventListener('click', submitAd);
  $$('.c2c-ad-type-btn').forEach(function(b) {
    b.addEventListener('click', function() {
      $$('.c2c-ad-type-btn').forEach(function(x) { x.classList.remove('active', 'buy', 'sell'); });
      this.classList.add('active', this.dataset.type);
    });
  });

  // 订单弹窗
  $('c2c-order-close')?.addEventListener('click', function() {
    $('c2c-order-modal').classList.add('hidden');
    if (C2C.chatTimer) { clearInterval(C2C.chatTimer); C2C.chatTimer = null; }
  });
  $('c2c-order-modal')?.addEventListener('click', function(e) {
    if (e.target === this) {
      $('c2c-order-modal').classList.add('hidden');
      if (C2C.chatTimer) { clearInterval(C2C.chatTimer); C2C.chatTimer = null; }
    }
  });
  $('c2c-chat-send')?.addEventListener('click', sendChatMsg);
  $('c2c-chat-input')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendChatMsg();
  });

  // 我的订单弹窗
  $('c2c-my-orders-close')?.addEventListener('click', function() {
    $('c2c-my-orders-modal').classList.add('hidden');
  });
  $('c2c-my-orders-modal')?.addEventListener('click', function(e) {
    if (e.target === this) $('c2c-my-orders-modal').classList.add('hidden');
  });

  // 我的广告弹窗
  $('c2c-my-ads-close')?.addEventListener('click', function() {
    $('c2c-my-ads-modal').classList.add('hidden');
  });
  $('c2c-my-ads-modal')?.addEventListener('click', function(e) {
    if (e.target === this) $('c2c-my-ads-modal').classList.add('hidden');
  });

  // 评价弹窗
  $('c2c-rating-close')?.addEventListener('click', function() {
    $('c2c-rating-modal').classList.add('hidden');
  });
  $('c2c-rating-modal')?.addEventListener('click', function(e) {
    if (e.target === this) $('c2c-rating-modal').classList.add('hidden');
  });
  $('c2c-rating-submit')?.addEventListener('click', submitRating);
  // 星级点击事件
  $$('#c2c-rating-stars .c2c-star').forEach(function(star) {
    star.addEventListener('click', function() {
      var r = parseInt(this.dataset.rating);
      ratingState.rating = r;
      $$('#c2c-rating-stars .c2c-star').forEach(function(s, i) {
        s.classList.toggle('selected', i < r);
        s.textContent = i < r ? '★' : '☆';
      });
      var hints = ['', t('c2c_rate_poor'), t('c2c_rate_fair'), t('c2c_rate_good'), t('c2c_rate_great'), t('c2c_rate_excellent')];
      $('c2c-rating-hint').textContent = hints[r] || '';
    });
    star.addEventListener('mouseenter', function() {
      var r = parseInt(this.dataset.rating);
      $$('#c2c-rating-stars .c2c-star').forEach(function(s, i) {
        s.classList.toggle('hover', i < r);
        s.textContent = i < r ? '★' : '☆';
      });
    });
    star.addEventListener('mouseleave', function() {
      var cur = ratingState.rating;
      $$('#c2c-rating-stars .c2c-star').forEach(function(s, i) {
        s.classList.remove('hover');
        s.classList.toggle('selected', i < cur);
        s.textContent = i < cur ? '★' : '☆';
      });
    });
  });

  // ===== 忘记密码 =====
  $('forgot-send-btn')?.addEventListener('click', sendResetCode);
  $('forgot-reset-btn')?.addEventListener('click', resetPassword);
  $('forgot-back-btn')?.addEventListener('click', forgotBackStep1);
  ['forgot-email', 'forgot-code', 'forgot-new-pw'].forEach(function(id) {
    $(id)?.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (id === 'forgot-email') sendResetCode();
        else if (id === 'forgot-code' || id === 'forgot-new-pw') resetPassword();
      }
    });
  });

  // ===== 提现 =====
  $('withdraw-close')?.addEventListener('click', closeWithdraw);
  $('withdraw-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeWithdraw();
  });
  $('withdraw-submit')?.addEventListener('click', submitWithdraw);
  $('withdraw-amount')?.addEventListener('input', updateWithdrawInfo);
  $$('#withdraw-coin-select .coin-option').forEach(function(o) {
    o.addEventListener('click', function() {
      $$('#withdraw-coin-select .coin-option').forEach(function(x){ x.classList.remove('active'); });
      this.classList.add('active');
      withdrawCoin = this.dataset.coin; withdrawNetwork = this.dataset.network;
      updateWithdrawInfo();
    });
  });

  // ===== 设置页 =====
  $('set-save-profile')?.addEventListener('click', saveProfile);
  $('set-change-pwd')?.addEventListener('click', changePassword);
  $('set-2fa-check')?.addEventListener('change', toggle2FA);

  // ===== 通知铃铛 =====
  $('notif-bell-btn')?.addEventListener('click', function(e) { e.stopPropagation(); toggleNotifDropdown(); });
  $('notif-mark-all')?.addEventListener('click', function(e) { e.stopPropagation(); markAllNotifsRead(); });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#notif-bell')) {
      var dd = $('notif-dropdown');
      if (dd) dd.classList.add('hidden');
    }
  });

  // ===== MA 图例 =====
  $$('.ma-item').forEach(function(item) {
    item.addEventListener('click', function() {
      this.classList.toggle('active');
      drawChart();
    });
  });

  // ===== Chart Crosshair =====
  var chartCanvas = $('price-chart');
  if (chartCanvas) {
    chartCanvas.addEventListener('mousemove', function(e) {
      if (!ST.klines.length) return;
      var rect = chartCanvas.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var pad = { left: 10, right: 60 };
      var pw = rect.width - pad.left - pad.right;
      // 找最近的K线
      var idx = Math.round((mx - pad.left) / pw * (ST.klines.length - 1));
      idx = Math.max(0, Math.min(ST.klines.length - 1, idx));
      if (ST.crosshair.index !== idx || !ST.crosshair.visible) {
        ST.crosshair.index = idx;
        ST.crosshair.visible = true;
        drawChart();
      }
    });
    chartCanvas.addEventListener('mouseleave', function() {
      if (ST.crosshair.visible) {
        ST.crosshair.visible = false;
        drawChart();
      }
    });
  }

  // ===== 止损限价输入 =====
  $('trade-stop-price')?.addEventListener('input', updateTradeTotal);

  // 初始路由（如果有 404 redirect，跳转到目标路径）
  var _doRoute = function() { if (_redirectPath) { navTo(_redirectPath); } else { route(); } };

  // 自动登录 — 只有 API 验证通过后才标记 authVerified
  if (ST.token) {
    api.get('/api/auth/profile').then(d => {
      ST.user = d.user; ST.authVerified = true; updateNavAuth(true); _doRoute();
      // 启动通知轮询
      fetchNotifications();
      if (notifPollTimer) clearInterval(notifPollTimer);
      notifPollTimer = setInterval(fetchNotifications, 15000);
    }).catch(() => {
      ST.token = null; ST.user = null; ST.authVerified = false;
      localStorage.removeItem('ct_token'); localStorage.removeItem('ct_user'); _doRoute();
    });
  } else { _doRoute(); }
});
