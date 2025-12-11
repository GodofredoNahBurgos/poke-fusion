import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FusionCardComponent } from './fusion-card.component';

describe('FusionCard', () => {
  let component: FusionCardComponent;
  let fixture: ComponentFixture<FusionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FusionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FusionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
