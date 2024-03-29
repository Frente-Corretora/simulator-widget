<?php

?>

<!-- Init Materialize and Material components: TAB AND SELECT-->
<script>
  // Instance selects
  window.initSelects = () => {
    window.remittance = window.mdc.select.MDCSelect.attachTo(document.getElementById('remittance-ul'));
    window.beneficiary = window.mdc.select.MDCSelect.attachTo(document.getElementById('beneficiary-ul'));
    window.remittanceType = window.mdc.select.MDCSelect.attachTo(document.getElementById('remittance-type-ul'));
    window.merchant = window.mdc.select.MDCSelect.attachTo(document.getElementById('merchant-ul'));
    window.exchange = window.mdc.select.MDCSelect.attachTo(document.getElementById('exchange-ul'));

    // Instance TABS
    var tabBar = new mdc.tabBar.MDCTabBar(document.querySelector('.mdc-tab-bar'));
    var contentEls = document.querySelectorAll('.content');
    tabBar.listen('MDCTabBar:activated', function (event) {
      // Hide currently-active content
      document.querySelector('.content--active').classList.remove('content--active');
      // Show content for newly-activated tab
      contentEls[event.detail.index].classList.add('content--active');
    });

    // Instance Tooltip
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});
  }
</script>

<!-- Wrap -->
<div id="simulator-container" class="row">

  <div class="col s12" style="border-bottom: 1px solid #8a8888; padding: 0;">
    <div class="mdc-tab-bar" role="tablist">
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area">
          <div class="mdc-tab-scroller__scroll-content">
            <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
              <span class="mdc-tab__content">
                <span class="mdc-tab__text-label">Remessa</span>
              </span>
              <span class="mdc-tab-indicator mdc-tab-indicator--active">
                <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
              </span>
              <span class="mdc-tab__ripple"></span>
            </button>
            <button class="mdc-tab mdc-tab" role="tab" aria-selected="true" tabindex="0">
              <span class="mdc-tab__content">
                <span class="mdc-tab__text-label">Papel Moeda</span>
              </span>
              <span class="mdc-tab-indicator mdc-tab-indicator">
                <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
              </span>
              <span class="mdc-tab__ripple"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!----------------------------- Remittance Content ----------------------------->
  <div class="col s12">
    <div class="content content--active">
      <form id="remittance">
        <!-- Column 1 & 2: Label for remittance type and beneficiary -->
        <div class="row" style="margin-top: 1vw;">
          <!-- Remittance type -->
          <div class="col s6">
            <p class="beneficiary">Tipo da Remessa</p>
          </div>

          <!-- Beneficiary label-->
          <div class="col s6">
            <p class="beneficiary">Para quem você vai enviar?</p>
          </div>
        </div>

        <!--Remittance type and beneficiary selector -->
        <div class="row" style="margin-top: -20px;">

          <!-- Remittance type -->
          <div class="col s6" style="margin-top: -8px;">
            <div class="mdc-select mdc-select--no-label" id="remittance-type-ul">
              <div class="mdc-select__anchor demo-width-class">
                <i class="mdc-select__dropdown-icon" id="caret-transparent"></i>
                <div class="mdc-select__selected-text"></div>
                <span class="mdc-line-ripple"></span>
              </div>
              <div class="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">
                <ul class="mdc-list" id="remittance-type" name="typeCode"></ul>
              </div>
            </div>
          </div>

          <!-- Beneficiary -->
          <div class="col s6" style="margin-top: -8px;">
            <div class="mdc-select mdc-select--no-label" id="beneficiary-ul">
              <div class="mdc-select__anchor demo-width-class">
                <i class="mdc-select__dropdown-icon" id="caret-transparent"></i>
                <div class="mdc-select__selected-text"></div>
                <span class="mdc-line-ripple"></span>
              </div>
              <div class="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">
                <ul class="mdc-list" id="remittance-beneficiary" name="purposeCode"></ul>
              </div>
            </div>
          </div>

        </div>

        <!-- Column 5 & 6: Brl currency label and input BRL value -->

        <!-- BRL label -->
        <div class="row" id="outbound-down" style="display: flex;">
          <div class="col s6" id="brl-column-rm">
            <label class="global-label" id="brl-coin">
              <img src="https://s3.amazonaws.com/frente-exchanges/flags/brazil.svg" class="br-flag">
              <div id="brl" style="margin-left: 4px;">Real</div>
            </label>
          </div>

          <!-- Value input-->
          <div class="col s6" id="remittance-value-input">
            <label id="currency-symbol-remittance-brl-value" class="label-symbol">R$</label>
            <input id="remittance-value" type="number" name="remittanceAmount" step="0.01" min="0" value="1200">
          </div>
        </div>

        <!-- Fee infos -->
        <div class="row">
          <div class="col s12" style="margin-top: -3px; margin-bottom: -3px; padding-left: 38px;
          padding-right: 38px;">
            <p><i class="fas fa-info-circle tooltipped" data-position="top"
                data-tooltip="É a cotação atual do mercado."></i> Cotação = R$
              <span id="priceWithoutTax"></span>
            </p>

            <p><i class="fas fa-info-circle tooltipped" data-position="top"
                data-tooltip="Tarifa bancária cobrada pela utilização do sistema bancário internacional."></i>
              Tarifa Bancária = R$ <span id="bankFee"></span></p>

            <p><i class="fas fa-info-circle tooltipped" data-position="top"
                data-tooltip="Significa Imposto sob operações financeiras e essa tarifa é retida pela Receita Federal."></i>
              IOF (<span id="remittance-iof"></span>%) = R$ <span id="remittance-with-iof"></span><span id="IR"> + IR</span>
            </p>

            <p><i class="fas fa-info-circle tooltipped" data-position="top"
                data-tooltip="Esse é o valor final da cotação, somada com todas as tarifas e impostos."></i> VET = R$
              <span id="priceWithTax"></span>
            </p>
          </div>
        </div>

        <!-- Selector for currencies -->
        <div class="row" id="inbound-up" style="display: flex;">
          <div class="col s6" id="usd-column-rm">
            <div class="mdc-select mdc-select--no-label" id="remittance-ul">
              <div class="mdc-select__anchor demo-width-class">
                <i class="mdc-select__dropdown-icon"></i>
                <div id="remittance-selected-text" class="mdc-select__selected-text"></div>
                <span class="mdc-line-ripple"></span>
              </div>
              <div class="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">
                <ul class="mdc-list" id="remittance-currencies"></ul>
              </div>
            </div>
          </div>

          <!-- Remittance result foreign currency input -->
          <div class="col s6" id="remittance-result-input">
            <label id="currency-symbol-remittance-value" class="label-symbol">USD</label>
            <input id="remittance-result" type="text" step="0.01" min="0" name="foreignCurrency">
          </div>
        </div>

        <!--Simulate button -->
        <div class="row">
          <div class="col s12">
            <button submit id="remittance-action-btn" class="waves-effect waves-light btn-large">SIMULE AGORA</button>
          </div>
        </div>
      </form>
    </div>
  </div>




  <!----------------------------- Paper Money ----------------------------->
  <div class="col s12">

    <div class="content">
      <form id="exchange">

        <!-- Column 1 & 2: Location/Agent label and location/agent selector -->
        <div class="row" style="align-items: left; margin-top: 1vw; margin-left: 1px; margin-right: 1vw;">

          <!-- Location/Agent -->
          <p class="beneficiary">Você está mais próximo de qual cidade?</p>
        </div>
        <!-- Location selector -->
        <div class="row" style="align-items: left; margin-top: -50px; margin-right: 1vw;">
          <div class="col s12" style="margin-top: 20px;">
            <div class="mdc-select mdc-select--no-label" id="merchant-ul">
              <div class="mdc-select__anchor demo-width-class">
                <i class="mdc-select__dropdown-icon" id="caret-transparent"></i>
                <div class="mdc-select__selected-text"></div>
                <span class="mdc-line-ripple"></span>
              </div>
              <div class="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">
                <ul class="mdc-list" id="state" name="merchantId"></ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3 & 4: Currency selector and value input -->
        <div class="row" style="display: flex;">

          <div class="col s6" id="usd-column-pm">
            <!-- Currencies -->
            <div class="mdc-select mdc-select--no-label" id="exchange-ul">
              <div class="mdc-select__anchor demo-width-class">
                <i class="mdc-select__dropdown-icon"></i>
                <div id="exchange-selected-text" class="mdc-select__selected-text"></div>
                <span class="mdc-line-ripple"></span>
              </div>
              <div class="mdc-select__menu mdc-menu mdc-menu-surface demo-width-class">
                <ul class="mdc-list" id="paper-money-currencies" name="productId"></ul>
              </div>
            </div>
          </div>

          <!-- Value input foreign currency -->
          <div class="col s6" id="exchange-value-input">
            <label id="currency-symbol-exchange-value" class="label-symbol">USD</label>
            <input id="paper-money-value" type="number" name="value" min="0" value="1000">
          </div>
        </div>

        <!-- Fee infos -->
        <div class="row">
          <div class="col s12" style="margin-top: -3px; margin-bottom: -3px; padding-left: 38px;
          padding-right: 38px;">
            <p class="iof">
              <i class="fas fa-info-circle tooltipped" data-position="top"
                data-tooltip="É a cotação atual do mercado somada com os custos operacionais e taxas."></i> Cotação
              Turismo = R$ <span id="quoation-exchange"></span>
            </p>

            <p class="iof"><i class="fas fa-info-circle tooltipped" data-position="top"
                data-tooltip="É o imposto federal incidente nas trocas de moedas para fins turísticos."></i> IOF (<span
                id="exchange-iof"></span>%) = R$
              <span id="exchange-with-iof"></span></p>

            <p class="iof"><i class="fas fa-info-circle tooltipped" data-position="top"
                data-tooltip="Valor final da cotação, somada com todos os impostos e tarifas."></i> VET = R$ <span
                id="vet-exchange"></span>
            </p>
          </div>
        </div>

        <!-- Column 5 & 6: Brl currency label and input BRL value -->

        <!-- BRL Label -->
        <div class="row" style="display: flex;">
          <div class="col s6" id="brl-column-pm">
            <label class="global-label brl-exchange" id="brl-coin">
              <img src="https://s3.amazonaws.com/frente-exchanges/flags/brazil.svg" class="br-flag">
              <div id="brl" style="margin-left: 4px;">Real</div>
            </label>
          </div>

          <!-- Value input -->
          <div class="col s6" id="exchange-result-input">
            <label id="currency-symbol-exhange-value-brl" class="label-symbol">R$</label>
            <input id="paper-money-result">
          </div>
        </div>

        <!-- Simulate button -->
        <div class="row">
          <div class="col s12">
            <button submit id="exchange-button" class="waves-effect waves-light btn-large">SIMULE AGORA</button>
          </div>
        </div>
      </form>
    </div>

  </div>

</div> <!-- END MAIN ROW -->
