// ===== State =====
let selectedState = '';
let selectedType = 'verified';
let selectedPrice = 40;
let selectedQty = 25;

const STATE_NAMES = {
  'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California',
  'CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia',
  'HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa',
  'KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland',
  'MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri',
  'MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey',
  'NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio',
  'OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina',
  'SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont',
  'VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'
};

const typeInfo = {
  verified: { name: 'Verified Lead', price: 40, summary: 'Includes: name, verified phone, address, homeowner confirmed, roof issue, call recording' },
  booked: { name: 'Booked Appointment', price: 75, summary: 'Includes: everything in Verified + scheduled date/time, decision maker confirmed, roof type, call recording' },
  transfer: { name: 'Live Transfer', price: 150, summary: 'Includes: everything in Verified + decision maker confirmed, available for estimate within 7 days, call recording' }
};

// ===== DOM =====
const stateSelect = document.getElementById('stateSelect');
const qtyInput = document.getElementById('qtyInput');
const typeTabs = document.querySelectorAll('.type-tab');
const orderBtn = document.getElementById('orderBtn');
const orderTotal = document.getElementById('orderTotal');
const typeSummary = document.getElementById('typeSummary');
const summaryType = document.getElementById('summaryType');
const summaryPrice = document.getElementById('summaryPrice');
const summaryQty = document.getElementById('summaryQty');
const summaryTotal = document.getElementById('summaryTotal');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.getElementById('closeModal');
const modalSummary = document.getElementById('modalSummary');
const payBtn = document.getElementById('payBtn');
const payBtnText = document.getElementById('payBtnText');
const paySpinner = document.getElementById('paySpinner');
const paymentError = document.getElementById('paymentError');
const paymentSection = document.getElementById('paymentSection');
const successSection = document.getElementById('successSection');
const downloadBtn = document.getElementById('downloadBtn');
const stateError = document.getElementById('stateError');
const qtyError = document.getElementById('qtyError');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// ===== Populate States =====
Object.entries(STATE_NAMES)
  .sort((a, b) => a[1].localeCompare(b[1]))
  .forEach(([code, name]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = name;
    stateSelect.appendChild(opt);
  });

// ===== Mobile Menu =====
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is clicked
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Lead Type Tabs =====
typeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    typeTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    selectedType = tab.dataset.type;
    selectedPrice = parseInt(tab.dataset.price);
    updateAll();
  });
});

// ===== Pricing Card Buttons → auto-select type & scroll to order =====
document.querySelectorAll('.card-order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.select;
    // Select the matching tab
    typeTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
      if (t.dataset.type === type) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
        selectedType = type;
        selectedPrice = parseInt(t.dataset.price);
      }
    });
    updateAll();
    // Scroll to order form
    const orderSection = document.getElementById('order');
    const offset = 80;
    const top = orderSection.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ===== Quantity Presets =====
const qtyBtns = document.querySelectorAll('.qty-btn');
qtyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    qtyBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const qty = parseInt(btn.dataset.qty);
    qtyInput.value = qty;
    selectedQty = qty;
    updateAll();
  });
});

// ===== Quantity Input =====
qtyInput.addEventListener('input', () => {
  let val = parseInt(qtyInput.value);
  if (isNaN(val) || val < 1) val = 1;
  if (val > 500) val = 500;
  selectedQty = val;
  // Deselect preset buttons if custom
  qtyBtns.forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.qty) === val);
  });
  updateAll();
  qtyError.classList.remove('show');
});

// ===== State =====
stateSelect.addEventListener('change', () => {
  selectedState = stateSelect.value;
  stateError.classList.remove('show');
  updateFormSteps();
});

// ===== Update Everything =====
function updateAll() {
  const total = selectedQty * selectedPrice;
  const info = typeInfo[selectedType];

  // Order button
  orderTotal.textContent = '$' + total.toLocaleString();

  // Type summary
  if (typeSummary) typeSummary.textContent = info.summary;

  // Order summary box
  if (summaryType) summaryType.textContent = info.name;
  if (summaryPrice) summaryPrice.textContent = '$' + info.price;
  if (summaryQty) summaryQty.textContent = selectedQty;
  if (summaryTotal) summaryTotal.textContent = '$' + total.toLocaleString();

  updateFormSteps();
}

function updateFormSteps() {
  const dots = document.querySelectorAll('.form-step-dot');
  dots.forEach(d => d.classList.remove('active'));
  // Step 1 always active
  if (dots[0]) dots[0].classList.add('active');
  // Step 2 active if state selected
  if (stateSelect.value && dots[1]) dots[1].classList.add('active');
  // Step 3 active if type is selected (always true) and qty > 0
  if (stateSelect.value && selectedQty > 0 && dots[2]) dots[2].classList.add('active');
}

updateAll();

// ===== Order =====
orderBtn.addEventListener('click', () => {
  let hasError = false;

  if (!stateSelect.value) {
    stateError.classList.add('show');
    stateSelect.focus();
    hasError = true;
  }

  const qty = parseInt(qtyInput.value);
  if (isNaN(qty) || qty < 1 || qty > 500) {
    qtyError.classList.add('show');
    if (!hasError) qtyInput.focus();
    hasError = true;
  }

  if (hasError) return;

  selectedState = stateSelect.value;
  selectedQty = qty;
  openModal();
});

// ===== Modal =====
function openModal() {
  const info = typeInfo[selectedType];
  const total = selectedQty * info.price;
  modalSummary.textContent = `${selectedQty}x ${info.name} in ${STATE_NAMES[selectedState]} — $${total.toLocaleString()}`;

  paymentSection.style.display = 'block';
  successSection.style.display = 'none';
  paymentError.style.display = 'none';
  payBtn.disabled = false;
  payBtnText.textContent = `Pay $${total.toLocaleString()}`;
  paySpinner.style.display = 'none';

  document.getElementById('payment-element').innerHTML = `
    <div style="background: var(--bg-elevated); border: 1px solid var(--border); border-radius: 8px; padding: 20px;">
      <div style="margin-bottom: 12px;">
        <label style="display:block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Card number</label>
        <input type="text" value="4242 4242 4242 4242" readonly style="width:100%; padding: 10px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; color: var(--text); font-size: 0.9rem; font-family: inherit;">
      </div>
      <div style="display: flex; gap: 12px;">
        <div style="flex:1;">
          <label style="display:block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">Expiry</label>
          <input type="text" value="12/28" readonly style="width:100%; padding: 10px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; color: var(--text); font-size: 0.9rem; font-family: inherit;">
        </div>
        <div style="flex:1;">
          <label style="display:block; font-size: 0.7rem; color: var(--text-muted); margin-bottom: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">CVC</label>
          <input type="text" value="123" readonly style="width:100%; padding: 10px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 6px; color: var(--text); font-size: 0.9rem; font-family: inherit;">
        </div>
      </div>
      <div style="text-align: center; margin-top: 14px; color: var(--text-muted); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;">DEMO MODE — No real charge</div>
    </div>
  `;

  paymentModal.classList.add('active');
}

closeModal.addEventListener('click', () => paymentModal.classList.remove('active'));
paymentModal.addEventListener('click', e => {
  if (e.target === paymentModal) paymentModal.classList.remove('active');
});

// ===== Demo Payment =====
payBtn.addEventListener('click', async () => {
  payBtn.disabled = true;
  payBtnText.textContent = 'Processing...';
  paySpinner.style.display = 'block';
  paymentError.style.display = 'none';

  await new Promise(r => setTimeout(r, 1500));

  paymentSection.style.display = 'none';
  successSection.style.display = 'block';
  paySpinner.style.display = 'none';
});

// ===== Download =====
downloadBtn.addEventListener('click', async () => {
  try {
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Generating leads...';

    const res = await fetch('/api/download-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: selectedType,
        state: selectedState,
        quantity: selectedQty
      })
    });

    if (!res.ok) throw new Error((await res.json()).error);

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roofroof-leads-${selectedType}-${selectedState}-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    downloadBtn.textContent = 'Downloaded!';
    setTimeout(() => {
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Download Again';
    }, 2000);
  } catch (err) {
    downloadBtn.disabled = false;
    downloadBtn.textContent = 'Retry Download';
  }
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');

  q.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq-a').style.maxHeight = '0';
    });

    if (!isActive) {
      item.classList.add('active');
      q.setAttribute('aria-expanded', 'true');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
