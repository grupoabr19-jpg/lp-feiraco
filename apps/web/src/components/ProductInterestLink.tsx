'use client';

export function ProductInterestLink({ interest }: { interest: string }) {
  function selectInterest() {
    sessionStorage.setItem('feiraco:selected-interest', interest);
    window.dispatchEvent(new CustomEvent('feiraco:select-interest', { detail: interest }));
  }

  return (
    <a href="#inscricao" onClick={selectInterest}>
      Tenho interesse <span aria-hidden="true">↗</span>
    </a>
  );
}
