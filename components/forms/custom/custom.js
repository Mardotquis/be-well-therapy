import React from 'react';
import CTA from '../cta/cta';

/** ********
custom component with Simple Practice integration from Rolanda

removed the custom <style> tag, but everything else is the same
********* */
export default function Custom() {
  return (
    < >
      
  <div class="spwidget-button-wrapper">
    <a href="https://bewelltherapy.clientsecure.me" class="spwidget-button" data-spwidget-scope-id="fb2b91c4-a145-451b-8360-64b66f970b65" data-spwidget-scope-uri="bewelltherapy" data-spwidget-application-id="7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b" data-spwidget-scope-global data-spwidget-autobind>
        <CTA>Request Appointment</CTA>
     </a>
  </div>
  <script src="https://widget-cdn.simplepractice.com/assets/integration-1.0.js" />
    </ >
  );
}
