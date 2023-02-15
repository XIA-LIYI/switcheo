use test;

# This is changes in users' balances
# Need the latest balance
create table balances (
    id int auto_increment primary key,
    address VARCHAR(255),
    denom VARCHAR(255),
    amount bigint,
    block_height int
);

create table trades (
    id int auto_increment primary key,
    address VARCHAR(255),
    block_height int
);
truncate trades;
insert into trades(address, block_height)
values('0xabab', 733756);
insert into trades(address, block_height)
values('0x99cc', 733757);
insert into trades(address, block_height)
values('0x67f3', 713758);

insert into balances(address, denom, amount)
values('0x99cc', 'swth', -20000000);
insert into balances(address, denom, amount)
values('0x99cc', 'usdc', 5000000000);
insert into balances(address, denom, amount)
values('0x99cc', 'tmz', 1000);
insert into balances(address, denom, amount)
values('0x67f3', 'usdc', 5000000000);



# sum different currencies
select balances.address, SUM(case 
when denom = "usdc" then amount * 0.000001
when denom = "swth" then amount * 0.00000005
when denom = "tmz" then amount * 0.003
  end) as balance
from balances join (select distinct address from trades WHERE block_height > 730000) as trade on trade.address = balances.address
group by address
having balance >= 500;
