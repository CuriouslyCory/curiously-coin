import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSaleComponent } from './coin-sale.component';

describe('CoinSaleComponent', () => {
  let component: CoinSaleComponent;
  let fixture: ComponentFixture<CoinSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
